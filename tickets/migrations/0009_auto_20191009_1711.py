# Generated by Django 2.2.6 on 2019-10-09 17:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0008_auto_20191009_1707'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ticketsolution',
            old_name='parent',
            new_name='parent_ticket',
        ),
    ]
