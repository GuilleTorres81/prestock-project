from rest_framework import serializers
from .models import *
class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = ['id', 'dni', 'nombre', 'apellido']
class ElementoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Elemento
        fields = '__all__'

class PrestamoElementoSerializer(serializers.ModelSerializer):
    elemento = ElementoSerializer(read_only=True)  # nested completo
    elemento_id = serializers.PrimaryKeyRelatedField(
        queryset=Elemento.objects.all(),
        source='elemento'
    )
    class Meta:
        model = PrestamoElemento
        fields = ("elemento_id", "elemento", "cantidad")

class PrestamoSerializer(serializers.ModelSerializer):
    elementos = PrestamoElementoSerializer(many=True, write_only=True)
    estudiante_id = serializers.PrimaryKeyRelatedField(
            queryset=Estudiante.objects.all(),
            source='estudiante',
            write_only=True
        )
    class Meta:
        model = Prestamo
        fields = ("id", "estudiante_id", "garantia", "fecha_prestamo", "devuelto", "elementos")

    def create(self, validated_data):
        elementos_data = validated_data.pop("elementos", [])
        prestamo = Prestamo.objects.create(**validated_data)
        for el in elementos_data:
            PrestamoElemento.objects.create(prestamo=prestamo, **el)
        return prestamo
    
class PrestamoReadSerializer(serializers.ModelSerializer):
    estudiante = EstudianteSerializer(read_only=True)
    detalle_elementos = PrestamoElementoSerializer(many=True, read_only=True)

    class Meta:
        model = Prestamo
        fields = ("id", "estudiante", "garantia", "fecha_prestamo", "devuelto", "detalle_elementos")
