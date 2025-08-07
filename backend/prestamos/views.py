from django.shortcuts import render
from datetime import datetime
from rest_framework import viewsets
from .models import Prestamo
from .serializers import PrestamoSerializer

def crear_prestamo(request):
    try:
        if request.method == 'POST':
            prestamo = Prestamo.objects.create(
                estudiante = request.POST['estudiante'],
                elemento = request.POST['elemento']
            )
    except Exception as e:
        print(f"Error creating loan: {e}")
        raise

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all().order_by('-fecha_prestamo')
    serializer_class = PrestamoSerializer