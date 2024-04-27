from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import VideoSession


class VideoSessionSerializer(ModelSerializer):
    class Meta:
        model = VideoSession
        fields = ('id', 'video_id', 'last_modified_date')
        read_only_fields = ('id', 'last_modified_date', 'chat_messages')

    chat_messages = SerializerMethodField('_get_chat_messages')

    def _get_chat_messages(self, obj: VideoSession):
        return obj.chat_messages.all().order_by('created_at')