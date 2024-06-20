import os
from dotenv import load_dotenv
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

load_dotenv()  # carga las propiedades de entorno de .env
def enviar_correo_bienvenida(email):
    try:
        email_envio = os.getenv('GMAIL')
        contraseña = os.getenv('GMAILPASS')
        email_recibe = email

        if not email_envio or not contraseña:
            raise ValueError("Las variables de entorno GMAIL y GMAILPASS deben estar configuradas.")

        # Crear cuerpo del mensaje
        mensaje = MIMEMultipart()
        mensaje['Subject'] = "Bienvenida a FitTitans"
        mensaje['From'] = email_envio
        mensaje['To'] = email_recibe

        # Leer y personalizar el archivo HTML
        with open('emailwelcome.html', 'r') as archivo:
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
        print(f"Correo enviado a {email_recibe} con éxito.")
    except FileNotFoundError:
        print("El archivo emailwelcome.html no se encuentra en la ruta especificada.")
        raise
    except Exception as e:
        print(f"Ocurrió un error al enviar el correo: {e}")
        raise
