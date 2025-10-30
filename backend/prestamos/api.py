from .models import Prestamo
from rest_framework import viewsets, permissions
from .serializers import *
from datetime import datetime
from django.utils.timezone import make_aware

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer
    
    def get_queryset(self):
        today = datetime.now().date()
        start_of_day = make_aware(datetime.combine(today, datetime.min.time()))
        end_of_day = make_aware(datetime.combine(today, datetime.max.time()))
        return Prestamo.objects.filter(fecha_prestamo__range=(start_of_day, end_of_day))
    
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return PrestamoReadSerializer
        return PrestamoSerializer
    
class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all().order_by('apellido')
    serializer_class = EstudianteSerializer

class ElementoViewSet(viewsets.ModelViewSet):
    queryset = Elemento.objects.all().order_by('nombre')
    serializer_class = ElementoSerializer