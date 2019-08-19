from profiles.models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework import permissions
from rest_framework.generics import ListAPIView


class UserProfileListView(ListAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = [permissions.AllowAny]
