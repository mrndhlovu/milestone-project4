# Generated by Django 2.2.3 on 2019-07-30 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0003_auto_20190730_1833'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='prority_level',
            field=models.CharField(choices=[('l', 'Low'), ('m', 'Medium'), ('h', 'High')], default='l', max_length=1),
        ),
    ]
