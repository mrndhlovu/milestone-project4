from django.urls import path, re_path
from .views import MembershipListAPIView, CancelSubscriptionAPIView

app_name = 'memberships'

urlpatterns = [
    path('', MembershipListAPIView.as_view(), name='membership_list'),
    path('cancel-subscription/', CancelSubscriptionAPIView.as_view(),
         name='cancel_subscription'),
]
