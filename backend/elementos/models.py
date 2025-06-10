from django.db import models

# Create your models here.
class Elemento(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    stock = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return self.nombre