from django.db import models
from ..videos.models import Video


class VideoSession(models.Model):
    video_id = models.ForeignKey(Video, on_delete=models.CASCADE)
    last_modified_date = models.DateTimeField(auto_now=True)
