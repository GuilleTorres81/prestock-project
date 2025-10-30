from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Elemento

@receiver(post_migrate)
def crear_elementos_iniciales(sender, **kwargs):
    if sender.name != "prestamos": 
        return

    nombres_iniciales = ["Mate", "Bombilla", "Termo", "Cuchara", "Taza", "Fibron", "Borrador"]

    for nombre in nombres_iniciales:
        Elemento.objects.get_or_create(nombre=nombre, defaults={"stock": 10})
