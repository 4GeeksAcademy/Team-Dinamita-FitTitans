from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    is_trainer = db.Column(db.Boolean, default=False)
    telefono = db.Column(db.String(80), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "username": self.nombre,
            "id": self.id,
            "email": self.email,
            "rol" : self.is_trainer,
            "phone": self.telefono
            # do not serialize the password, its a security breach
        }
    

    