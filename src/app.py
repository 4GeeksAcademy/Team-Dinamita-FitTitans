"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import openai
from api.RecuperarContraseña import enviar_correo
from api.EmailBienvenida import enviar_correo_bienvenida
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, render_template, flash, redirect, render_template
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager
import jwt
import uuid
from flask_mail import Mail, Message
from datetime import datetime, timedelta, timezone
import bcrypt
from dotenv import load_dotenv
load_dotenv()
# para el chat
from flask_socketio import SocketIO, emit, join_room, leave_room, disconnect
from flask_apscheduler import APScheduler
import pytz
# para correos
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from itsdangerous import URLSafeTimedSerializer
from api.models import db, User, Asignacion_entrenador, Message


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

app = Flask(__name__)

app.url_map.strict_slashes = False

# Configuración de la aplicación
app.config['SECRET_KEY'] = 'fit_titans_ajr'  # Cambia esto por una clave secreta segura
app.config['SECURITY_PASSWORD_SALT'] = 'fit_titans_ajr'  # Cambia esto por un salt seguro
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=72)


# Configura el scheduler
scheduler = APScheduler()
scheduler.init_app(app)

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
# Habilitar CORS para todos los orígenes
CORS(app, resources={r"/*": {"origins": "*"}})
#socketio = SocketIO(app, cors_allowed_origins="*")

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

#eliminar mensajes de la base de datos
@app.route('/api/delete_old_messages', methods=['POST'])
def manually_delete_old_messages():
    deleted_count = delete_old_messages()
    return jsonify({"deleted_count": deleted_count}), 200

if __name__ == '__main__':
    app.run()

@scheduler.task('interval', id='delete_old_messages', hours=72)
def delete_old_messages():
    try:
        # Obtén la zona horaria UTC
        utc_timezone = pytz.timezone('UTC') 
        # Calcula la fecha límite para eliminar los mensajes (24 horas atrás)
        cutoff_date = datetime.now(utc_timezone) - timedelta(hours=72)
        # Elimina los mensajes anteriores a la fecha límite
        deleted_count = Message.query.filter(Message.timestamp < cutoff_date).delete()
        db.session.commit()

        print(f"Deleted {deleted_count} old messages.")
    except Exception as e:
        print(f"Error deleting old messages: {str(e)}")
        db.session.rollback()

if __name__ == '__main__':
    scheduler.start()
    app.run()


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

    if not email or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    hashed_password = hash_password(password)
    # Convertir el valor de rol a un booleano si es true sera entrenador, si es false usuario
    rol_booleano = True if rol else False
    user_uuid = str(uuid.uuid4())
    enviar_correo_bienvenida(email)
    new_user = User(email=email, password=hashed_password, rol=rol_booleano, nombre=nombre,  user_uuid = user_uuid)
    db.session.add(new_user)
    db.session.commit()  
    # Obtengo el id del usuario recien creado
    user_id = new_user.id 
    # Devuelvo el ID del usuario como parte de la respuesta
    return jsonify({'message': 'User registered successfully', 'userId': user_id}), 201

# para iniciar sesion
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

    token = create_access_token(identity= user.id , expires_delta=timedelta(minutes=60))
    return jsonify({'message': 'Login successful', "token": token, "user_rol" : user.rol, "id" : user.id}), 200

# GETTING ALL THE USERS
@app.route("/users", methods=["GET"])
def get_all_users():
    all_users = User.query.all()
    mapped_users = list(map(lambda index: index.serialize(), all_users))
    response_body = jsonify(mapped_users)
    return response_body, 200

#usuario unico
@app.route("/Usuarios/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    usuarios = User.query.filter_by(rol=False).all()
    if user is None and usuarios is True:
        return jsonify({"message": "User not found"}), 404
    return jsonify(user.serialize()), 200 

#entrenador unico
@app.route("/listaentrenadores/<int:user_id>", methods=["GET"])
def entrenadores_id(user_id):
    user = User.query.get(user_id)
    usuarios = User.query.filter_by(rol=True).all()
    if user is None and usuarios is True:
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

#PARA ENTRENADORES 
# para mostrar la lista de entrenadores
@app.route('/listaentrenadores', methods=['GET'])
def get_entrenadores_usuarios():
    users = User.query.all()
    entrenadores = [user.serialize() for user in users if user.rol] # filtra solo los usuarios que tienen el campo rol igual a True, lo que indica que son entrenadores.
    return jsonify({
        "entrenadores": entrenadores,
    }), 200

#para editar el perfil del usuario entrenador
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
    user.tipo_entrenamiento = data.get('tipo_entrenamiento', user.tipo_entrenamiento)
    user.foto = data.get('foto', user.foto)
    user.videos= data.get('videos', user.videos)
    db.session.commit()

    return jsonify(user.serialize()), 200

#  para el entrenador obtener sus clientes :
@app.route("/listaentrenadores/<int:entrenador_id>/clientes", methods=["GET"])
def get_clientes_by_entrenador_id(entrenador_id):
    # Obtener los clientes asignados a un entrenador dado
    asignaciones = db.session.query(Asignacion_entrenador).filter_by(entrenador_id=entrenador_id).all()
    clientes = [User.query.get(asignacion.usuario_id).serialize() for asignacion in asignaciones]
    return jsonify(clientes), 200

#para obtener los planes del cliente rutina, dieta etc
@app.route("/clientes/<int:cliente_id>", methods=["GET"])
def get_cliente_detalle(cliente_id):
    cliente = User.query.get(cliente_id)
    if cliente is None:
        return jsonify({"message": "Cliente no encontrado"}), 404

    asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
    if asignacion is None:
        return jsonify({"message": "Asignación no encontrada"}), 404

    cliente_detalle = cliente.serialize()
    cliente_detalle.update({
        "dieta": asignacion.dieta,
        "rutina": asignacion.rutina,
        "plan_entrenamiento": asignacion.plan_entrenamiento
    })
    return jsonify(cliente_detalle), 200

# para contratar a un entrenador
@app.route('/contratar', methods=['POST'])
def contratar_entrenador():
    data = request.get_json()
    entrenador_id = data.get('entrenador_id')
    usuario_id = data.get('usuario_id')
    plan_entrenamiento= data.get ('plan_entrenamiento')
    print(data)

    if not entrenador_id or not usuario_id:
        return jsonify({"error": "Faltan datos"}), 400

    entrenador = User.query.get(entrenador_id)
    usuario = User.query.get(usuario_id)

    if not entrenador or not usuario:
        return jsonify({"error": "Usuario o entrenador no encontrado"}), 404

    if not entrenador.rol or usuario.rol:
        return jsonify({"error": "Roles incorrectos"}), 400

    # Verifico si ya existe una asignacion
    asignacion_existente = Asignacion_entrenador.query.filter_by(entrenador_id=entrenador_id, usuario_id=usuario_id).first()
    if asignacion_existente:
        return jsonify({"error": "El usuario ya ha contratado a este entrenador"}), 400

    asignacion = Asignacion_entrenador(
        entrenador_id=entrenador_id,
        usuario_id=usuario_id,
        plan_entrenamiento=plan_entrenamiento,
    )
    db.session.add(asignacion)
    db.session.commit()
    return jsonify({"message": "Entrenador contratado exitosamente"}), 200

#para editar borrar o modificar rutinas el entrenador
@app.route("/clientes/<int:cliente_id>/rutina", methods=["GET"])
def obtener_rutina(cliente_id):
    asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
    if asignacion is None:
        return jsonify({"message": "Asignación no encontrada"}), 404
    return jsonify({"rutina": asignacion.rutina.split(';') if asignacion.rutina else []}), 200

@app.route('/clientes/<int:cliente_id>/rutina', methods=['POST'])
def crear_rutina(cliente_id):
    data = request.get_json()
    nueva_rutina = data.get('rutina')
    if not nueva_rutina:
        return jsonify({"message": "Rutina no proporcionada"}), 400

    asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
    if asignacion is None:
        return jsonify({"message": "Asignación no encontrada"}), 404

    rutinas = asignacion.rutina.split(';') if asignacion.rutina else []
    rutinas.append(nueva_rutina)
    asignacion.rutina = ';'.join(rutinas)
    db.session.commit()
    return jsonify({"message": "Rutina añadida exitosamente"}), 201

@app.route('/clientes/<int:cliente_id>/rutina', methods=['PUT'])
def actualizar_rutina(cliente_id):
    data = request.get_json()
    nueva_rutina = data.get('rutina')

    asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
    if not asignacion:
        return jsonify({"error": "Asignación no encontrada"}), 404

    asignacion.rutina = ';'.join(nueva_rutina)
    db.session.commit()
    return jsonify({"message": "Rutina actualizada correctamente"}), 200

@app.route('/clientes/<int:cliente_id>/rutina', methods=['DELETE'])
def eliminar_rutina(cliente_id):
    asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
    if not asignacion:
        return jsonify({"error": "Asignación no encontrada"}), 404

    asignacion.rutina = None
    db.session.commit()
    return jsonify({"message": "Rutina eliminada correctamente"}), 200 

# /////#para que el cliente vea su rutina
@app.route('/clienteasignado/<int:cliente_id>/rutina', methods=['GET'])
def obtener_rutina_cliente(cliente_id):
    try:
        cliente = User.query.get(cliente_id)
        if not cliente:
            return jsonify({"error": "Cliente no encontrado"}), 404
        asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
        if not asignacion:
            return jsonify({"error": "Asignación no encontrada para este cliente"}), 404

        rutina_cliente = asignacion.rutina.split(';') if asignacion.rutina else []
        return jsonify({"rutina": rutina_cliente}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# DIETA para ver, crear, editar y eliminar el entrenador 
@app.route('/clientes/<int:cliente_id>/dieta', methods=['GET'])
def obtener_dieta(cliente_id):
    asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
    if not asignacion:
        return jsonify({"error": "Asignación no encontrada"}), 404
    return jsonify({"dieta": asignacion.dieta.split(';') if asignacion.dieta else []}), 200

@app.route('/clientes/<int:cliente_id>/dieta', methods=['POST'])
def crear_dieta(cliente_id):
    data = request.get_json()
    nueva_dieta = data.get('dieta')
    if not nueva_dieta:
        return jsonify({"message": "Rutina no proporcionada"}), 400

    asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
    if asignacion is None:
        return jsonify({"message": "Asignación no encontrada"}), 404

    dietas = asignacion.dieta.split(';') if asignacion.dieta else []
    dietas.append(nueva_dieta)
    asignacion.dieta = ';'.join(dietas)
    db.session.commit()
    return jsonify({"message": "Dieta añadida exitosamente"}), 201

@app.route('/clientes/<int:cliente_id>/dieta', methods=['PUT'])
def actualizar_dieta(cliente_id):
    data = request.get_json()
    nueva_dieta = data.get('dieta')

    asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
    if not asignacion:
        return jsonify({"error": "Asignación no encontrada"}), 404

    asignacion.dieta = ';'.join(nueva_dieta)
    db.session.commit()
    return jsonify({"message": "Dieta actualizada correctamente"}), 200

@app.route('/clientes/<int:cliente_id>/dieta', methods=['DELETE'])
def eliminar_dieta(cliente_id):
    asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
    if not asignacion:
        return jsonify({"error": "Asignación no encontrada"}), 404

    asignacion.dieta = None
    db.session.commit()
    return jsonify({"message": "Dieta eliminada correctamente"}), 200 

#para que el cliente vea su dieta
@app.route('/clienteasignado/<int:cliente_id>/dieta', methods=['GET'])
def obtener_dieta_cliente(cliente_id):
    cliente = User.query.get(cliente_id)
    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404
    asignacion = Asignacion_entrenador.query.filter_by(usuario_id=cliente_id).first()
    if not asignacion:
        return jsonify({"error": "Asignación no encontrada para este cliente"}), 404
    dieta_cliente = asignacion.dieta.split(';') if asignacion.dieta else []
    return jsonify({"dieta": dieta_cliente}), 200

# Configurar Flask-Mail para usar Mailtrap
def configure_mail(app):
    app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
    app.config['MAIL_PORT'] = 2525
    app.config['MAIL_USERNAME'] = '41f4804efd3283'
    app.config['MAIL_PASSWORD'] = '4bd4cccf66d78e'
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False

configure_mail(app)
mail = Mail(app)

# Función para generar un token de restablecimiento de contraseña
def generate_reset_token(email):
    exp_time = datetime.now(timezone.utc) + timedelta(minutes=30)
    payload = {
        'sub': email,
        'exp': exp_time
    }
    secret_key = 'short_secret'
    return jwt.encode(payload, secret_key, algorithm='HS256')

# Función para decodificar el token de restablecimiento de contraseña
def decode_reset_token(token):
    try:
        payload = jwt.decode(token, 'short_secret', algorithms=['HS256'])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# Ruta para solicitar la recuperación de contraseña
@app.route('/solicitud', methods=['POST'])
def forgot_password():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()

    if user:
        user_uuid = user.user_uuid
        reset_link = f"https://glowing-spork-jj94vv5pq7p2ppw7-3000.app.github.dev/reset-password/{user_uuid}"
        enviar_correo(email, reset_link)

        return jsonify({"msg": "Password reset link sent"}, reset_link), 200

    return jsonify({"msg": "Email not found"}), 404

@app.route('/reset-password', methods=['PUT'])
def recovery_password():
    data = request.get_json(force=True)
    try:
        user_uuid = data.get('user_uuid')
        new_password = data.get('password')
        user = User.query.filter_by(user_uuid=user_uuid).first()
        hashed_password = hash_password(new_password)
        if user:
            user.password = hashed_password
            db.session.commit()
            return jsonify({"message": "Usuario confirmado exitosamente"}, user.password), 200
        else:
            return jsonify({"error": "Usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": f"Error al confirmar el usuario: {str(e)}"}), 500

#blog 
socketio = SocketIO(app, cors_allowed_origins="*")
# Almacenar los usuarios conectados con sus IDs de Socket.IO
connected_users = {}

@socketio.on('connect')
def handle_connect():
    user_id = request.args.get('user_id')
    if user_id:
        connected_users[request.sid] = user_id
        emit('message', {'text': f'User {user_id} connected'}, broadcast=True)
    else:
        emit('message', {'text': 'User ID is required'}, room=request.sid)
        disconnect()

@socketio.on('disconnect')
def handle_disconnect():
    user_id = connected_users.pop(request.sid, None)
    if user_id:
        emit('message', {'text': f'User {user_id} disconnected'}, broadcast=True)

@socketio.on('message')
def handle_message(data):
    try:
        remitente_id = data.get('remitente_id')
        destinatario_id = data.get('destinatario_id')
        text = data.get('text')

        if remitente_id and destinatario_id and text:
            message = Message(
                remitente_id=remitente_id, 
                destinatario_id=destinatario_id, 
                text=text
            )
            db.session.add(message)
            db.session.commit()

            message_data = message.serialize()
            emit('message', message_data, broadcast=True)
        else:
            emit('error', {'error': 'Invalid message data'}, room=request.sid)
    except Exception as e:
        print(f"Error: {e}")
        emit('error', {'error': 'An error occurred while saving the message'}, room=request.sid)

@app.route('/api/mensajes', methods=['GET'])
def get_messages():
    remitente_id = request.args.get('remitente_id')
    destinatario_id = request.args.get('destinatario_id')

    if not remitente_id or not destinatario_id:
        return jsonify({"error": "Both remitente_id and destinatario_id are required"}), 400

    try:
        messages = Message.query.filter(
            ((Message.remitente_id == remitente_id) & (Message.destinatario_id == destinatario_id)) |
            ((Message.remitente_id == destinatario_id) & (Message.destinatario_id == remitente_id))
        ).order_by(Message.timestamp).all()

        return jsonify([message.serialize() for message in messages]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/destinatario', methods=['GET'])
def get_destinatario_id():
    remitente_id = request.args.get('remitente_id')
    if not remitente_id:
        return jsonify({"error": "remitente_id is required"}), 400

    try:
        es_entrenador = User.query.filter_by(id=remitente_id, rol=True).first() is not None

        if es_entrenador:
            destinatario = Asignacion_entrenador.query.filter(Asignacion_entrenador.usuario_id != remitente_id).first()
            if not destinatario:
                return jsonify({"error": "No destinatario found"}), 404
            destinatario_id = destinatario.usuario_id
        else:
            destinatario = Asignacion_entrenador.query.filter(Asignacion_entrenador.entrenador_id != remitente_id).first()
            if not destinatario:
                return jsonify({"error": "No destinatario found"}), 404
            destinatario_id = destinatario.entrenador_id

        return jsonify({"destinatario_id": destinatario_id}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    socketio.run(app, debug=True)


@app.route('/api/asignaciones_entrenador', methods=['GET'])
def get_asignaciones_entrenador():
    try:
        asignaciones = Asignacion_entrenador.query.all()
        serialized_asignaciones = [asignacion.serialize() for asignacion in asignaciones]
        return jsonify(serialized_asignaciones), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#videos entrenador
@app.route('/agregarVideo/<int:id>', methods=['POST'])
@jwt_required()
def agregar_video(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    url = data.get('url')
    titulo = data.get('titulo')

    if not url :
        return jsonify({"error": "URL y título del video son requeridos"}), 400

    user.add_video(url, titulo)  # Utiliza el método add_video para agregar el URL y título
    db.session.commit()

    return jsonify({"msg": "Video agregado exitosamente"}), 200

@app.route('/listaentrenadores/videos', methods=['GET'])
@jwt_required()
def get_entrenadores_video():
    users = User.query.all()
    entrenadores = [user.serialize() for user in users if user.rol] # filtra solo los usuarios que tienen el campo rol igual a True, lo que probablemente indica que son entrenadores.
    return jsonify({
        "entrenadores": entrenadores,
    }), 200


# Configura tu API key de OpenAI
from openai import OpenAI

@app.route('/chatgpt', methods=['POST'])
def obtener_respuesta():
    data = request.get_json()
    mensaje = data.get('mensaje')

    if not mensaje:
        return jsonify({"error": "Ingresa mensaje"}), 413
    
    client = OpenAI(
        api_key=os.environ.get("CHATGPT"),
    )

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": mensaje}
        ]
    )
    
    response = completion.choices[0].message.content  # Asegúrate de extraer el contenido del mensaje

    return jsonify({"response": response})  # Devuelve el contenido como JSON
#no borrar
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)


