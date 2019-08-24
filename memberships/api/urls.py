from django.urls import path, re_path
from .views import MembershipListView, MembershipsDetailAPI


urlpatterns = [
    path('', MembershipListView.as_view(), name='select'),
    path('type/<pk>/', MembershipsDetailAPI.as_view(), name='single_option')

]
