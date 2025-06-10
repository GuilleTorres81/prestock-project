from django.db import models
from estudiantes.models import Estudiante
from elementos.models import Elemento

class Prestamo(models.Model):
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE)
    elemento = models.ForeignKey(Elemento, on_delete=models.CASCADE)
    fecha_prestamo = models.DateTimeField(auto_now_add=True)
    fecha_devolucion = models.DateTimeField(null=True, blank=True)
    devuelto = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.estudiante} → {self.elemento}"