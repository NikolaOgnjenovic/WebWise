from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import VideoSession
from ..chat_messages.serializers import ChatMessageSerializer


class VideoSessionSerializer(ModelSerializer):
    class Meta:
        model = VideoSession
        fields = ('video_id', 'id', 'last_modified_date', 'chat_messages')
        read_only_fields = ('id', 'last_modified_date', 'chat_messages')

    chat_messages = ChatMessageSerializer(many=True, read_only=True)
