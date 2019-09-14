from django.urls import path, re_path
from .views import MembershipAddToCart, MembershipCheckoutView, CancelSubscriptionAPI, MembershipTransactionUpdateView, MembershipsProfileAPI, MembershipTypesAPI, MembershipDeleteFromCart, MembershipPendingOrder, MembershipCheckoutOrder

app_name = 'memberships'

urlpatterns = [
    path('', MembershipAddToCart.as_view(), name='membership_list'),
    path('types/', MembershipTypesAPI.as_view(), name='membership_type'),
    path('add-to-cart/', MembershipAddToCart.as_view(),
         name='add_membership_to_cart'),
    path('remove/', MembershipDeleteFromCart.as_view(),
         name='remove_membership_from_cart'),
    path('payments/', MembershipCheckoutView.as_view(), name='payments'),
    path('user-profile/', MembershipsProfileAPI.as_view(), name='user_profile'),
    path('cancel-subscription/', CancelSubscriptionAPI.as_view(),
         name='cancel_subscription'),
    path('update-transaction/', MembershipTransactionUpdateView.as_view(),
         name='update_transaction'),
    path('pending-order/', MembershipPendingOrder.as_view(),
         name='pending_order'),
    path('checkout/', MembershipCheckoutOrder.as_view(),
         name='checkout')
]
