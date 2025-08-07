from rest_framework import serializers
from .models import Prestamo, Estudiante
class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = '__all__'