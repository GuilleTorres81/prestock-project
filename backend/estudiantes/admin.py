from django.contrib import admin
from .models import Estudiante

@admin.register(Estudiante)
class EstudianteAdmin(admin.ModelAdmin):
    list_display = ('dni', 'apellido', 'nombre')
    search_fields = ('dni', 'apellido')
    list_filter = ('dni',)
    ordering = ('apellido', 'nombre')
    list_per_page = 20