from rest_framework.routers import DefaultRouter
from .views import EstudianteViewSet

router = DefaultRouter()
router.register(r'api', EstudianteViewSet)

urlpatterns = router.urls

