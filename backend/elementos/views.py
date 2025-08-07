from rest_framework import viewsets
from .models import Elemento
from .serializers import ElementoSerializer
class ElementoViewSet(viewsets.ModelViewSet):
    queryset = Elemento.objects.all().order_by('nombre')
    serializer_class = ElementoSerializer