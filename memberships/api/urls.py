from django.urls import path, re_path
from .views import MembershipAddToCart, CancelSubscriptionAPI, MembershipTransactionUpdateView, SubscribedUserRetrieveAPI, MembershipTypesAPI, MembershipDeleteFromCart, MembershipPendingOrderApi, MembershipCartCheckoutApi, MembershipTypesRetriveAPI

app_name = 'memberships'

urlpatterns = [
    path('', MembershipAddToCart.as_view(), name='membership_list'),
    path('types/', MembershipTypesAPI.as_view(), name='membership_type'),
    path('types/<pk>/', MembershipTypesRetriveAPI.as_view(),
         name='single_membership'),
    path('add-to-cart/', MembershipAddToCart.as_view(),
         name='add_membership_to_cart'),
    path('remove/', MembershipDeleteFromCart.as_view(),
         name='remove_membership_from_cart'),
    path('payments/', MembershipCartCheckoutApi.as_view(), name='payments'),
    path('member-profile/',
         SubscribedUserRetrieveAPI.as_view(), name='subscribed_user_profile'),
    path('cancel-subscription/', CancelSubscriptionAPI.as_view(),
         name='cancel_subscription'),
    path('update-transaction/', MembershipTransactionUpdateView.as_view(),
         name='update_transaction'),
    path('pending-order/', MembershipPendingOrderApi.as_view(),
         name='pending_order'),
    path('checkout/', MembershipCartCheckoutApi.as_view(),
         name='checkout')
]
