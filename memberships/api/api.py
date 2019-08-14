from rest_framework import generics, permissions
from .serializers import MembershipSerializer


# Create user api
class MembershipsAPI(generics.RetrieveAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = MembershipSerializer
