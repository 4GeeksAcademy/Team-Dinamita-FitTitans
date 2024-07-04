import os
from dotenv import load_dotenv
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

load_dotenv()  # carga las propiedades de entorno de .env
def enviar_correo_bienvenida (email) :
    email_envio = os.getenv('GMAIL')
    contraseña = os.getenv('GMAILPASS')
    email_recibe = email

    # Crear cuerpo del mensaje
    body = "Test"
    mensaje = MIMEMultipart()
    mensaje['Subject'] = "Bienvenida a FitTitans"
    mensaje['From'] = email_envio
    mensaje['To'] = email_recibe

    # Obtener la ruta absoluta del archivo email.html
    script_dir = os.path.dirname(__file__)  # Directorio del script actual
    rel_path = "emailwelcome.html"  # Ruta relativa al archivo email.html
    abs_file_path = os.path.join(script_dir, rel_path)

    # Leer y personalizar el archivo HTML si existe
    if os.path.exists(abs_file_path):
        with open(abs_file_path, 'r', encoding='utf-8') as archivo:
            html = archivo.read()
            html_personalizado = html.replace('{{email}}', email)

    # Adjuntar archivo HTML personalizado
    mensaje.attach(MIMEText(html_personalizado, 'html'))

    # Solicitud a Gmail para hacer las cosas
    server = smtplib.SMTP('smtp.gmail.com', 587)
    # Conexión segura
    server.starttls()
    server.login(email_envio, contraseña)

    # Enviar correo
    server.sendmail(email_envio, email_recibe, mensaje.as_string().encode('utf-8'))
    server.quit()
