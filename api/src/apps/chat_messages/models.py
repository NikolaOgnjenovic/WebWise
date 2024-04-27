from django.db import models
from django.contrib.auth.models import User
from ..video_sessions.models import VideoSession


class ChatMessage(models.Model):
    message = models.TextField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    video_id = models.ForeignKey(VideoSession, on_delete=models.CASCADE, related_name='chat_messages')
    created_at = models.DateTimeField(auto_now_add=True)
