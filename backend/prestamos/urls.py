from django.urls import path
from .views import *

urlpatterns = [
    path('/', lista_prestamos, name='lista'),
]
