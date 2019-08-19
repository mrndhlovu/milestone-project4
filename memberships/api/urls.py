from django.urls import path, re_path
from .views import MembershipListView


urlpatterns = [
    path('', MembershipListView.as_view(), name='select')
]
