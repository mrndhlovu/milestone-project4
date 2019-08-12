from rest_framework import generics, permissions
from .serializers import ProductSerializer


# Create user api
class ProductsAPI(generics.RetrieveAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = ProductSerializer
