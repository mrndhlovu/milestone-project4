from django.urls import path, re_path
from .views import MembershipListView, MembershipsDetailAPI, MembershipPaymentView, MembershipTransactionUpdateView

app_name = 'memberships'

urlpatterns = [
    path('', MembershipListView.as_view(), name='membership_list'),
    path('select/', MembershipListView.as_view(), name='selected_membership'),
    path('payments/', MembershipPaymentView.as_view(), name='payments'),
    path('update-transaction/', MembershipTransactionUpdateView.as_view(),
         name='update_transaction/')

]
