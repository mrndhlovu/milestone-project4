# Generated by Django 2.2.6 on 2019-11-05 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='image',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]