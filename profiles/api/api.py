from rest_framework import generics, permissions
from .serializers import UserProfileSerializer


# Create user api
class UserProfileAPI(generics.RetrieveAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user
