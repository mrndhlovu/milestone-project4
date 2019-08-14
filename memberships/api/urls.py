from rest_framework.routers import DefaultRouter
from .views import MembershipViewSet

router = DefaultRouter()
router.register(r'', MembershipViewSet, base_name='memberships'),

urlpatterns = router.urls
