# Generated by Django 2.2.3 on 2019-08-06 23:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=120)),
                ('subject', models.CharField(max_length=120)),
                ('description', models.TextField()),
                ('votes', models.IntegerField(default=0)),
                ('status', models.CharField(choices=[('todo', 'To-do'), ('doing', 'Doing'), ('done', 'Done')], default='todo', max_length=6)),
                ('in_progress', models.BooleanField(default=False)),
                ('slug', models.SlugField(blank=True)),
                ('views', models.IntegerField(default=0)),
                ('owner', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
