from rest_framework.views import APIView
from rest_framework.response import Response

class HelloEstudiante(APIView):
    def get(self, request):
        return Response({"message": "Hola desde estudiantes!"})
