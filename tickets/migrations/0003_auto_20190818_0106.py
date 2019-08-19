# Generated by Django 2.2.4 on 2019-08-18 01:06

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tickets', '0002_auto_20190818_0023'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='votes',
        ),
        migrations.AddField(
            model_name='ticket',
            name='votes',
            field=models.ManyToManyField(blank=True, related_name='ticket_votes', to=settings.AUTH_USER_MODEL),
        ),
    ]