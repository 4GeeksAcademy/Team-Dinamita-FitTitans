from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(150), unique=False, nullable=False)
    rol = db.Column(db.Boolean(), unique=False, nullable=False, default=True)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "rol": self.rol
            # do not serialize the password, its a security breach
        }
    

class usuario_entrenador(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    clientes = db.relationship('UsuarioCliente', backref='entrenador', lazy=True) # Establece una relacion uno a muchos

    def __repr__(self):
        return f'<UsuarioEntrenador {self.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "clientes": [cliente.serialize() for cliente in self.clientes]
            # Serializa la lista de clientes asociados al entrenador
        }


class usuario_cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    entrenador_id = db.Column(db.Integer, db.ForeignKey('usuario_entrenador.id')) # Define un campo entero para almacenar el ID del entrenador asociado

    def __repr__(self):
        return f'<UsuarioCliente {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "entrenador_id": self.entrenador_id
            # Serializa el ID del entrenador asociado al cliente
        }

    