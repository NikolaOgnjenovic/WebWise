from django.db import models


# Create your models here.
class Video(models.Model):
    title = models.CharField(max_length=100)
    thumbnail_url = models.URLField()
    video_url = models.URLField()
    uploader_id = models.CharField(max_length=50)
