"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
# from models import Person

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

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data['email']
    password = data['password']
    role = data['role']  # 'trainer' or 'client'
    
    # Crear el usuario en Firebase Authentication
    user = auth.create_user(email=email, password=password)
    
    # Guardar el rol del usuario en Firestore
    db.collection('users').document(user.uid).set({
        'email': email,
        'role': role
    })
    
    return jsonify({'message': 'User created successfully', 'uid': user.uid}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']
    
    # Aquí necesitarás verificar el usuario, en producción usarías Firebase Authentication
    user = auth.get_user_by_email(email)
    
    return jsonify({'message': 'User logged in successfully', 'uid': user.uid})

@app.route('/users/trainers', methods=['GET'])
def get_trainers():
    trainers = db.collection('users').where('role', '==', 'trainer').stream()
    trainer_list = [{'uid': trainer.id, 'email': trainer.get('email')} for trainer in trainers]
    return jsonify(trainer_list)

@app.route('/trainers/<uid>/clients', methods=['GET'])
def get_clients(uid):
    clients = db.collection('users').where('role', '==', 'client').where('trainer_uid', '==', uid).stream()
    client_list = [{'uid': client.id, 'email': client.get('email')} for client in clients]
    return jsonify(client_list)


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
