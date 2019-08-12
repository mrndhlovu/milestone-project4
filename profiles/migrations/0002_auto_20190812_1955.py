# Generated by Django 2.2.4 on 2019-08-12 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='Membership',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='UserMembership',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='Product',
            field=models.ManyToManyField(to='products.Product'),
        ),
    ]
