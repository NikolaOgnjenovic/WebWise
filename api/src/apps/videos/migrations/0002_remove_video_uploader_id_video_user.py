# Generated by Django 5.0.4 on 2024-04-27 22:04

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videos', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='video',
            name='uploader_id',
        ),
        migrations.AddField(
            model_name='video',
            name='user',
            field=models.ForeignKey(default=-1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]