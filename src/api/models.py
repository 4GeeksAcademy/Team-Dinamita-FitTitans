from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), unique=False, nullable=False)
    rol = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    nombre =  db.Column(db.String(120), unique=False, nullable=False)
    telefono = db.Column(db.String(120), unique=True, nullable=False)

    perfil_entrenador = db.relationship('Perfil_entrenador', backref='user', uselist=False) #el nombre del backref es el nombre que yo le pongo a la relacion de las tablas
    
   
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        perfil_entrenador_data = self.perfil_entrenador.serialize() if self.perfil_entrenador else {}
        # Combinar los datos del usuario y del perfil del entrenador en un solo diccionario
        return {
            "id": self.id,
            "email": self.email,
            "rol": self.rol,
            "nombre": self.nombre,
            "telefono": self.telefono,
            **perfil_entrenador_data  # Añado los datos del perfil del entrenador
        }
    
    
class Perfil_entrenador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_entrenador_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tipo_entrenamiento = db.Column(db.String(100), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    genero = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        return f'<Perfil_entrenador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_entrenador_id": self.user_entrenador_id,
            "tipo_entrenamiento": self.tipo_entrenamiento,
            "edad": self.edad,
            "genero": self.genero
        }
    

class Perfil_usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_usuario_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    genero = db.Column(db.String(10), nullable=True)
    peso = db.Column(db.String(30), nullable=True)
    altura = db.Column(db.String(30), nullable=True)
    foto = db.Column(db.String(100), nullable=True)
    

    def __repr__(self):
        return f'<Usuarios {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_usuario_id ": self.user_usuario_id ,
            "nombre": self.nombre,
            "genero": self.genero,
            "peso": self.peso,
            "altura": self.altura,
            "foto": self.foto
        }

class Asignacion_entrenador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entrenador_id = db.Column(db.Integer, db.ForeignKey('perfil_entrenador.id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('perfil_usuario.id'), nullable=False)

    entrenador = db.relationship('Perfil_entrenador', backref='asignaciones')
    usuario = db.relationship('Perfil_usuario', backref='asignaciones')

    def __repr__(self):
        return f'<Asignacion_entrenador {self.id}>'