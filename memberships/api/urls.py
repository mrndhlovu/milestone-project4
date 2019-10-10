from django.urls import path, re_path
from .views import MembershipListAPIView, UserSubscriptionAPIView, CancelSubscriptionAPIView

app_name = 'memberships'

urlpatterns = [
    path('', MembershipListAPIView.as_view(), name='membership_list'),
    path('cancel-subscription/', CancelSubscriptionAPIView.as_view(),
         name='cancel_subscription'),
    path('member-profile/', UserSubscriptionAPIView.as_view(),
         name='membership_profile'),
]
