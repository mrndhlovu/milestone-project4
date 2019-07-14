from rest_framework.routers import DefaultRouter
from .views import TicketViewSet

router = DefaultRouter()
router.register(r'', TicketViewSet, base_name='tickets'),

urlpatterns = router.urls
