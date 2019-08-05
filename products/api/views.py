from products.models import Product
from .serializers import ProductSerializer
from rest_framework import viewsets, permissions


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [permissions.AllowAny]
