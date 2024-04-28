from django.db import models
from django.contrib.auth.models import User


class Video(models.Model):
    title = models.CharField(max_length=100)
    thumbnail_url = models.URLField()
    video_url = models.URLField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
