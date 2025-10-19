from rest_framework.routers import DefaultRouter
from .api import PrestamoViewSet, EstudianteViewSet, ElementoViewSet

router = DefaultRouter()
router.register(r'api/prestamos', PrestamoViewSet, basename='prestamo')
router.register(r'api/estudiantes', EstudianteViewSet)
router.register(r'api/elementos', ElementoViewSet)

urlpatterns = router.urls
