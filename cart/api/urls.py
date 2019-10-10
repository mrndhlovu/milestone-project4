from .views import AddToCartAPIView, OrderDetailAPIView, CartRemoveItemAPIView, PaymentAPIView, DonationAPIView
from django.urls import path, re_path

app_name = 'cart'

urlpatterns = [
    path('add-to-cart/', AddToCartAPIView.as_view(), name='add_to_cart'),
    path('pending-order/', OrderDetailAPIView.as_view(), name='order_detail'),
    path('remove-item/', CartRemoveItemAPIView.as_view(),
         name='cart_remove_item'),
    path('checkout/', PaymentAPIView.as_view(), name='checkout'),
    path('donate/', DonationAPIView.as_view(), name='checkout'),
]
