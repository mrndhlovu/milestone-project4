from django.contrib import admin
from .models import Membership, UserMembership, Subcription


# Register your models here.

admin.site.register(Membership)
admin.site.register(UserMembership)
admin.site.register(Subcription)
