from django.contrib import admin
from .models import Prestamo

@admin.register(Prestamo)
class PrestamoAdmin(admin.ModelAdmin):
    list_display = ('estudiante', 'elemento', 'fecha_prestamo', 'fecha_devolucion', 'devuelto')
    search_fields = ('estudiante__dni', 'estudiante__apellido', 'elemento__nombre')
    list_filter = ('devuelto', 'fecha_prestamo', 'fecha_devolucion')
    ordering = ('-fecha_prestamo',)
    list_per_page = 20