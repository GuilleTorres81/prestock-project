from django.urls import path
from .views import *

urlpatterns = [
    path('new/', nuevo_elemento, name='nuevo_elemento'),
]
