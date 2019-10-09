# from products.models import Product
from accounts.models import UserProfile
from comments.models import Comment
from django.contrib import admin
from django.contrib.auth import get_user_model
from memberships.models import Membership, UserMembership, Subscription
from tickets.models import Ticket, TicketSolution
from cart.models import Cart, CartItem, CartPayment

User = get_user_model()

admin.site.unregister(User)
admin.site.register(User)
admin.site.register(UserProfile)


admin.site.register(Membership)
admin.site.register(UserMembership)
admin.site.register(Subscription)

admin.site.register(Ticket)
admin.site.register(TicketSolution)
admin.site.register(Comment)

admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(CartPayment)
