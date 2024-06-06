"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, usuario_cliente, usuario_entrenador
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, JWTManager





ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

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
    
    if not email or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    hashed_password = hash_password(password)
    
    new_user = User(email=email, password=hashed_password, rol=rol)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

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
    return jsonify({'message': 'Login successful', "token": token, "user_rol" : user.rol}), 200
    
# GETTING ALL THE USERS
@app.route("/users", methods=["GET"])
def get_all_users():
    all_users = User.query.all()
    mapped_users = list(map(lambda index: index.serialize(), all_users))

    response_body = jsonify(mapped_users)
    return response_body, 200


# para ver la lista de clientes por entrenador
@app.route('/entrenador/<int:entrenador_id>/clientes')
def ver_lista_de_clientes(entrenador_id):
    clientes = usuario_cliente.query.filter_by(entrenador_id=entrenador_id).all()
    lista_de_clientes = [cliente.serialize() for cliente in clientes]
    return jsonify(lista_de_clientes)

# Verificar si el usuario está autenticado
def usuario_autenticado():
    authorization_header = request.headers.get("Authorization")
    if authorization_header and authorization_header.startswith("Bearer "):
        return True
    return False

# Obtener el ID del usuario autenticado
def obtener_id_usuario_autenticado():
    return get_jwt_identity()

# para contratar al entrenador
@app.route('/contratar_entrenador/<int:entrenador_id>', methods=['POST'])
def contratar_entrenador(entrenador_id):
    # Verifico si el usuario esta autenticado y obtengo su id
    if not usuario_autenticado():
        return jsonify({'message': 'Debe iniciar sesión para contratar a un entrenador'}), 401

    usuario_id = obtener_id_usuario_autenticado()

    # Asociar al usuario como cliente del entrenador en la base de datos
    entrenador = usuario_entrenador.query.get(entrenador_id)
    if not entrenador:
        return jsonify({'message': 'Entrenador no encontrado'}), 404

    # Actualizar el rol del usuario a usuarioCliente
    user = User.query.get(usuario_id)
    user.rol = False  # Rol de usuarioCliente
    db.session.add(user)

    # Guardar la relación entre el usuario y el entrenador en la base de datos
    cliente = usuario_cliente(usuario_id=usuario_id, entrenador_id=entrenador_id)
    db.session.add(cliente)

    db.session.commit()

    return jsonify({'message': 'Entrenador contratado exitosamente'}), 200




# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)





