from django.db import models
from django.contrib.auth import get_user_model

# Create ticket model

User = get_user_model()


class Mileage(models.Model):
    owner = models.ForeignKey(User)
    date = models.DateField()
    ...  # other parameters

# admin.py


class TicketAdmin(admin.ModelAdmin):
    # list_display = ['date', ...]

    def save_model(self, request, instance, form, change):
        user = request.user
        instance = form.save(commit=False)
        instance.owner = user
        instance.save()

        return instance

    # views.py
    def home(request):
        form = MileageForm(request.POST or None)
        context = {"form": form}

        if form.is_valid():
            instance = form.save()

            form = MileageForm()
            context = {"form": form}

        return render(request, 'record_trip.html', context)


# class Ticket(models.Model):
#     PRIORITY_LEVELS = (
#         ('low', 'Low'),
#         ('medium', 'Medium'),
#         ('high', 'High'),
#     )
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     title = models.CharField(max_length=120)
#     subject = models.CharField(max_length=120)
#     description = models.TextField()
#     prority_level = models.CharField(
#         max_length=6, choices=PRIORITY_LEVELS, default='low')
#     in_progress = models.BooleanField(default=False)
#     slug = models.SlugField(blank=True)

#     owner = models.ForeignKey(
#         User, on_delete=models.CASCADE, null=True, default=None)

#     def __str__(self):
#         return self.title

#     def snippet(self):
#         return self.description[:40] + '...'

#     def restore_object(self, attrs, instance=None):
#         new_instance = False
#         if not instance:
#             new_instance = True

#         instance = super().restore_object(attrs, instance)

#         # Only set the owner if this is a new instance
#         if new_instance:
#             request = self.context.get('request', None)
#             setattr(instance, 'owner', request.user)

#         return instance
