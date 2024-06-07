from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), unique=False, nullable=False)
    rol = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    nombre =  db.Column(db.String(120), unique=True, nullable=False)
    telefono = db.Column(db.String(120), unique=True, nullable=False)
   


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "rol": self.rol,
            "nombre" : self.nombre,
            "telefono" : self.telefono
            # do not serialize the password, its a security breach
        }
    
class Entrenador(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    tipo_entrenamiento = db.Column(db.String(100), nullable=True)
    edad = db.Column(db.Integer, nullable=True)
    genero = db.Column(db.String(10), nullable=True)

    user = db.relationship('User', backref=db.backref('entrenadores', uselist=False))

    def __repr__(self):
        return f'<Entrenador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "nombre": self.nombre,
            "tipo_entrenamiento": self.tipo_entrenamiento,
            "email": self.user.email,
            "edad": self.edad,
            "genero": self.genero
        }
    

class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    genero = db.Column(db.String(10), nullable=True)
    peso = db.Column(db.String(30), nullable=True)
    altura = db.Column(db.String(30), nullable=True)
    telefono = db.Column(db.String(100), nullable=True)
    foto = db.Column(db.String(100), nullable=True)
    
    user = db.relationship('User', backref=db.backref('usuarios', uselist=False))

    def __repr__(self):
        return f'<Usuarios {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "nombre": self.nombre,
            "email": self.user.email,
            "genero": self.genero,
            "peso": self.peso,
            "altura": self.altura,
            "telefono": self.telefono,
            "foto": self.foto
        }