# Generated by Django 2.2.3 on 2019-07-27 08:18

import django.contrib.auth.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='owner',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name=django.contrib.auth.models.User),
        ),
    ]