from django.contrib import admin
from .models import Prestamo, PrestamoElemento, Estudiante, Elemento

# --- PrestamoAdmin ---
class PrestamoAdmin(admin.ModelAdmin):
    list_display = ("id", "estudiante", "mostrar_elementos", "garantia", "fecha_prestamo", "devuelto")

    def mostrar_elementos(self, obj):
        return ", ".join(
            f"{pe.cantidad} {pe.elemento.nombre}" if pe.cantidad > 1 else pe.elemento.nombre
            for pe in obj.detalle_elementos.all()
        )
    mostrar_elementos.short_description = "Elementos"

admin.site.register(Prestamo, PrestamoAdmin)

# --- PrestamoElementoAdmin ---
class PrestamoElementoAdmin(admin.ModelAdmin):
    list_display = ("prestamo", "elemento", "cantidad")

admin.site.register(PrestamoElemento, PrestamoElementoAdmin)

# --- EstudianteAdmin ---
class EstudianteAdmin(admin.ModelAdmin):
    list_display = ("nombre", "apellido", "dni")
    search_fields = ("nombre", "apellido", "dni")

admin.site.register(Estudiante, EstudianteAdmin)

# --- ElementoAdmin ---
class ElementoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "stock")
    search_fields = ("nombre",)

admin.site.register(Elemento, ElementoAdmin)
