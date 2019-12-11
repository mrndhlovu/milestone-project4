# Generated by Django 3.0 on 2019-12-11 21:46

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
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=120)),
                ('subject', models.CharField(max_length=120)),
                ('content', models.TextField()),
                ('views', models.IntegerField(default=0)),
                ('is_approved', models.BooleanField(default=False)),
                ('image', models.CharField(blank=True, default=None, max_length=200, null=True)),
                ('likes', models.ManyToManyField(blank=True, related_name='article_likes', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
