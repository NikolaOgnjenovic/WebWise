from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import ChatMessage


class ChatMessageSerializer(ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ('id', 'message', 'user', 'created_at', 'username')
        read_only_fields = ('id', 'created_at', 'username')

    username = SerializerMethodField('_get_user_username')

    def _get_user_username(self, obj: ChatMessage):
        return obj.user.username
