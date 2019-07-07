from rest_framework import routers
from .api import TicketViewSet

router = routers.DefaultRouter()
router.register('api/tickets', TicketViewSet, 'tickets')
router.register('tickets', TicketViewSet, 'tickets')


urlpatterns = router.urls
