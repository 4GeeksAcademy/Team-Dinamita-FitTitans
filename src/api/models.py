from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), unique=False, nullable=False)
    rol = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    nombre =  db.Column(db.String(120), unique=False, nullable=False)
    telefono = db.Column(db.String(120), unique=True, nullable=False)
    edad = db.Column(db.Integer, nullable=True)
    genero = db.Column(db.String(10), nullable=True)
    altura = db.Column(db.String(30), nullable=True)
    tipo_entrenamiento = db.Column(db.String(100), nullable=True)
    foto = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "rol": self.rol,
            "nombre": self.nombre,
            "telefono": self.telefono, 
            "edad": self.edad,  
            "genero": self.genero,  
            "altura": self.altura,
            "tipo_entrenamiento": self.tipo_entrenamiento,
            "foto": self.foto,
        }
    

class Asignacion_entrenador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entrenador_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    dieta = db.Column(db.String(100), nullable=True)
    rutina = db.Column(db.String(100), nullable=True)
