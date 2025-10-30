from django.db import models

class Estudiante(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    dni = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.nombre + ' ' + self.apellido

class Elemento(models.Model):
    nombre = models.CharField(max_length=100)
    stock = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return self.nombre
class Prestamo(models.Model):
    estudiante = models.ForeignKey(
        "Estudiante", on_delete=models.CASCADE
    )
    elementos = models.ManyToManyField(
        "Elemento", through="PrestamoElemento", related_name="prestamos"
    )
    garantia = models.CharField(max_length=255, null=True, blank=True)
    fecha_prestamo = models.DateTimeField(auto_now_add=True)
    fecha_devolucion = models.DateTimeField(null=True, blank=True)
    devuelto = models.BooleanField(default=False)

    def __str__(self):
        return f"Préstamo {self.id} - {self.estudiante}"

class PrestamoElemento(models.Model):
    prestamo = models.ForeignKey(
        Prestamo, on_delete=models.CASCADE, related_name="detalle_elementos"
    )
    elemento = models.ForeignKey(Elemento, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ("prestamo", "elemento")  # evita duplicados

    def __str__(self):
        return f"{self.cantidad} x {self.elemento.nombre} (Préstamo {self.prestamo.id})"