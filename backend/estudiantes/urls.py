from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', HelloEstudiante.as_view()),
]
