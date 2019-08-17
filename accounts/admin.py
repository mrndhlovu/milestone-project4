from django.contrib import admin
from django.contrib.auth import get_user_model
from profiles.models import UserProfile
# from products.models import Product
# from tickets.models import Ticket
# from memberships.models import Membership, UserMembership, Subcription


User = get_user_model()


admin.site.register(UserProfile)

admin.site.unregister(User)
admin.site.register(User)


# admin.site.register(Product)
# admin.site.register(Membership)
# admin.site.register(UserMembership)
# admin.site.register(Subcription)
# admin.site.register(Ticket)
