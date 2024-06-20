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

     # Obtener la ruta absoluta del archivo emailwelcome.html
    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'emailwelcome.html')

        # Leer y personalizar el archivo HTML
    with open(file_path, 'r') as archivo:
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
