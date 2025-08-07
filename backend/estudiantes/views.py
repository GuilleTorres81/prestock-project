from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Estudiante
from .serializers import EstudianteSerializer
class HelloEstudiante(APIView):
    def get(self, request):
        return Response({"message": "Hola desde estudiantes!"})

class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all().order_by('apellido')
    serializer_class = EstudianteSerializer