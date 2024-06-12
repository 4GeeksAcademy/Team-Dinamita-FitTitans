"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, render_template, flash, redirect
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from itsdangerous import URLSafeTimedSerializer
from api.models import db, User, Asignacion_entrenador


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de la aplicación
app.config['SECRET_KEY'] = 'fit_titans_ajr'  # Cambia esto por una clave secreta segura
app.config['SECURITY_PASSWORD_SALT'] = 'fit_titans_ajr'  # Cambia esto por un salt seguro

# Configuraciones de email
app.config['EMAIL'] = os.getenv("EMAIL")
app.config['PASSWORD'] = os.getenv("PASSWORD")

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints

@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "adios-coroto"  # Change this "super secret" with something else!
jwt = JWTManager(app)

 # contraseña hash

def hash_password(plain_password):
    salt = bcrypt.gensalt()
    print(salt)
    hashed_password = bcrypt.hashpw(plain_password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def check_password(plain_password, hashed_password):
    print(plain_password, hashed_password)
    hashed_password_bytes = hashed_password.encode('utf-8')
    print(plain_password, hashed_password)
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password_bytes)

@app.route('/registro', methods=['POST'])
def registro():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    rol = data.get('rol', False)
    nombre = data.get('nombre')
    telefono = data.get('telefono')

    if not email or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    hashed_password = hash_password(password)
    
    # Convertir el valor de rol a un booleano si es true sera entrenador, si es false usuario
    rol_booleano = True if rol else False

    new_user = User(email=email, password=hashed_password, rol=rol_booleano, nombre=nombre, telefono=telefono)
    db.session.add(new_user)
    db.session.commit()
    
    # Obtengo el id del usuario recien creado
    user_id = new_user.id
    
    # Devuelvo el ID del usuario como parte de la respuesta
    return jsonify({'message': 'User registered successfully', 'userId': user_id}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({'message': 'usuario no encontrado'}), 401
    if not check_password(password, user.password) : 
        return jsonify({'message': 'contrasegna incorrecta'}), 402
        
    token = create_access_token(identity= user.id)
    return jsonify({'message': 'Login successful', "token": token, "user_rol" : user.rol, "id" : user.id}), 200
    
# GETTING ALL THE USERS
@app.route("/users", methods=["GET"])
def get_all_users():
    all_users = User.query.all()
    mapped_users = list(map(lambda index: index.serialize(), all_users))

    response_body = jsonify(mapped_users)
    return response_body, 200


@app.route("/Usuarios/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user.serialize()), 200 


@app.route('/Usuarios', methods=['GET'])
def obtener_usuarios():
    try:
        usuarios = User.query.filter_by(rol=False).all()
        usuarios_data = [usuarios.serialize() for usuarios in usuarios]
        return jsonify(usuarios_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/Usuarios/<int:id>', methods=['PUT'])
def actualizar_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()
    print("Datos recibidos:", data)
    user.email = data.get('email', user.email)
    user.nombre = data.get('nombre', user.nombre)
    user.telefono = data.get('telefono', user.telefono)
    user.rol = data.get('rol', user.rol)
    
    db.session.commit()

    return jsonify(user.serialize()), 200


@app.route("/perfiles", methods=["GET"])
@jwt_required()
def show_email():
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    return jsonify({"email": user.email, "id": user.id, "response": "That is your data up there!"}), 200



#PARA ENTRENADORES 
@app.route('/listaentrenadores', methods=['GET'])
def get_entrenadores_usuarios():
    users = User.query.all()
    entrenadores = [user.serialize() for user in users if user.rol]  # filtra solo los usuarios que tienen el campo rol igual a True, lo que probablemente indica que son entrenadores.
    return jsonify({
        "entrenadores": entrenadores,
    }), 200

@app.route("/listaentrenadores/<int:entrenador_id>", methods=["GET"])
def get_entrenador_by_id(entrenador_id):
    user = User.query.get(entrenador_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user.serialize()), 200 


@app.route('/listaentrenadores/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    data = request.get_json()
    print("Datos recibidos:", data)
    user.email = data.get('email', user.email)
    user.nombre = data.get('nombre', user.nombre)
    user.telefono = data.get('telefono', user.telefono)
    user.rol = data.get('rol', user.rol)
    user.edad = data.get('edad', user.edad)
    user.genero = data.get('genero', user.genero)
    user.altura = data.get('altura', user.altura)
    user.tipo_entrenamiento = data.get('edad', user.tipo_entrenamiento)
    user.foto = data.get('foto', user.foto)
    
    db.session.commit()

    return jsonify(user.serialize()), 200

# // Para obtener los clientes de un entrenador 
@app.route("/listaentrenadores/<int:entrenador_id>/clientes", methods=["GET"])
def get_clientes_by_entrenador_id(entrenador_id):
    # Obtener los client_ids para el entrenador dado
    client_ids = db.session.query(Asignacion_entrenador.usuario_id).filter_by(entrenador_id=entrenador_id).all()
    client_ids = [client_id[0] for client_id in client_ids]  # Extraer los IDs de los resultados

    # Obtener la información de los usuarios para esos clientes_ids
    clients_info = User.query.filter(User.id.in_(client_ids)).all()
    
    return jsonify (clients_info), 200

# aannnaaa. @app.route('/rutinas/cliente', methods=['POST'])
# def ():
#     # //// obtener parametros del body (entrenadorId, UsusariID, Rutina)

   
#         return jsonify({'message': 'Ok'}), 200

    

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)



# recuperar contraseña
def generate_password_reset_token(email):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])

def verify_password_reset_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        email = serializer.loads(
            token,
            salt=app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except:
        return False
    return email

# Ruta de Solicitud de Recuperación de Contraseña
@app.route('/users/solicitud', methods=['POST'])
def solicitar_recuperacion():
    data = request.get_json(force=True)
    print("data", data)

    email = data.get('email')

    if not email:
        return jsonify({'message': 'Email es requerido'}), 400

    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    token = generate_password_reset_token(email)
    reset_url = url_for('reset_password', token=token, _external=True)

    # Configurar el correo electrónico
    email_envio = app.config['EMAIL']
    contraseña = app.config['PASSWORD']
    mensaje = MIMEMultipart()
    mensaje['Subject'] = "Recuperación de Contraseña"
    mensaje['From'] = email_envio
    mensaje['To'] = email

    # Crear el contenido del correo
    html_content = f"""
    <html>
        <head></head>
        <body>
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
            <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
            <p><a href="{reset_url}">{reset_url}</a></p>
            <p>Si no solicitaste este restablecimiento de contraseña, puedes ignorar este correo.</p>
            <p>Gracias,</p>
            <p>El equipo de Fit Titans</p>
        </body>
    </html>
    """

    # Adjuntar el contenido HTML al correo
    mensaje.attach(MIMEText(html_content, 'html'))

    # Enviar correo
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(email_envio, contraseña)
        server.sendmail(email_envio, email, mensaje.as_string())
        server.quit()
        return jsonify({'message': 'Correo de recuperación enviado'}), 200
    except Exception as e:
        return jsonify({'message': 'Error al enviar correo', 'error': str(e)}), 500
    

# Ruta de Restablecimiento de Contraseña
@app.route('/reset-password/<token>', methods=['PATCH'])
def reset_password(token):
    data = request.get_json()
    new_password = data.get('password')

    if not new_password:
        return jsonify({'message': 'La contraseña es requerida'}), 400

    email = verify_password_reset_token(token)
    if not email:
        return jsonify({'message': 'Token inválido o expirado'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    user.password = hash_password(new_password)
    db.session.commit()

    return jsonify({'message': 'Contraseña actualizada exitosamente'}), 200

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)


