from django.contrib import admin
from .models import Elemento

@admin.register(Elemento)
class ElementoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'stock')
    search_fields = ('nombre','descripcion')
    list_filter = ('nombre',)
    ordering = ('nombre', 'stock')
    list_per_page = 20
