from rest_framework import serializers
from .models import Prestamo, Estudiante, Elemento
class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = ['dni', 'nombre', 'apellido']
class ElementoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Elemento
        fields = '__all__'

class PrestamoSerializer(serializers.ModelSerializer):
    estudiante = serializers.PrimaryKeyRelatedField(queryset=Estudiante.objects.all())
    elemento = serializers.PrimaryKeyRelatedField(queryset=Elemento.objects.all())
    class Meta:
        model = Prestamo
        fields = ['id', 'elemento', 'estudiante', 'garantia', 'fecha_prestamo', 'fecha_devolucion', 'devuelto']
        read_only_fields = ('fecha_prestamo', 'fecha_devolucion')