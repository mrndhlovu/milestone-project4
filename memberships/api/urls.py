from django.urls import path, re_path
from .views import MembershipListView, MembershipPaymentView, CancelSubscriptionAPI, MembershipTransactionUpdateView, MembershipsProfileAPI, MembershipTypesAPI

app_name = 'memberships'

urlpatterns = [
    path('', MembershipListView.as_view(), name='membership_list'),
    path('types/', MembershipTypesAPI.as_view(), name='membership_type'),
    path('select/', MembershipListView.as_view(), name='selected_membership'),
    path('payments/', MembershipPaymentView.as_view(), name='payments'),
    path('user-profile/', MembershipsProfileAPI.as_view(), name='user_profile'),
    path('cancel-subscription/', CancelSubscriptionAPI.as_view(),
         name='cancel_subscription'),
    path('update-transaction/', MembershipTransactionUpdateView.as_view(),
         name='update_transaction/')

]
