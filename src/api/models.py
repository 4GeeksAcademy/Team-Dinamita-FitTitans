from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    user_uuid= db.Column(db.String(250), nullable=True)
    password = db.Column(db.String(150), unique=False, nullable=False)
    rol = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    nombre =  db.Column(db.String(120), unique=False, nullable=False)
    telefono = db.Column(db.String(120), unique=True, nullable=True)
    edad = db.Column(db.Integer, nullable=True)
    genero = db.Column(db.String(10), nullable=True)
    altura = db.Column(db.String(30), nullable=True)
    tipo_entrenamiento = db.Column(db.String(500), nullable=True)
    foto = db.Column(db.String(100), nullable=True)
    videos = db.Column(db.Text, nullable=True)  # Mantén el campo como Texto

    asignaciones_entrenador = db.relationship('Asignacion_entrenador', backref='entrenador', foreign_keys='Asignacion_entrenador.entrenador_id')
    asignaciones_cliente = db.relationship('Asignacion_entrenador', backref='cliente', foreign_keys='Asignacion_entrenador.usuario_id')

    def __repr__(self):
        return f'<User {self.email}>'

    def get_videos(self):
        videos_list = []
        if self.videos:
            for video in self.videos.split(';'):  # Dividir la cadena por ';' para obtener una lista de videos
                if video.strip():  # Asegúrate de no procesar cadenas vacías
                    parts = video.split(',')
                    if len(parts) >= 2:
                        video_data = {
                            'url': parts[0].strip(),
                            'titulo': parts[1].strip()
                        }
                        videos_list.append(video_data)
        return videos_list

    def add_video(self, url, titulo):
        current_videos = self.videos or ""
        new_video = f"{url},{titulo};"
        self.videos = current_videos + new_video

    def serialize(self):
        return {
            "id": self.id,
            "user_uuid": self.user_uuid,
            "email": self.email,
            "rol": self.rol,
            "nombre": self.nombre,
            "telefono": self.telefono,
            "edad": self.edad,
            "genero": self.genero,
            "altura": self.altura,
            "tipo_entrenamiento": self.tipo_entrenamiento,
            "foto": self.foto,
            "videos": self.get_videos(),
        }
    
class Asignacion_entrenador(db.Model):
    __tablename__ = "asignacion_entrenador"
    id = db.Column(db.Integer, primary_key=True)
    entrenador_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    plan_entrenamiento = db.Column(db.String(50), nullable=False)
    dieta = db.Column(db.Text, nullable=True)
    rutina = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<Asignacion_entrenador {self.id}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "entrenador_id": self.entrenador_id,
            "usuario_id": self.usuario_id,
            "plan_entrenamiento": self.plan_entrenamiento,
            "dieta": self.dieta,
            "rutina": self.rutina   
        }

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    remitente_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    destinatario_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    remitente = db.relationship('User', foreign_keys=[remitente_id])
    destinatario = db.relationship('User', foreign_keys=[destinatario_id])

    def __repr__(self):
        return f'<Message {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "timestamp": self.timestamp.isoformat(),
            "remitente_id": self.remitente_id,
            "remitente_nombre": self.remitente.nombre,
            "destinatario_id": self.destinatario_id,
            "destinatario_nombre": self.destinatario.nombre
        }