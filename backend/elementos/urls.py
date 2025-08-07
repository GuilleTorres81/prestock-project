from rest_framework.routers import DefaultRouter
from .views import ElementoViewSet

router = DefaultRouter()
router.register(r'api', ElementoViewSet)

urlpatterns = router.urls

