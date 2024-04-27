from rest_framework.serializers import ModelSerializer
from .models import ChatMessage


class ChatMessageSerializer(ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ('id', 'message', 'user', 'created_at')
        read_only_fields = ('id', 'created_at')
        # extra_kwargs = {
        #     'user': {'read_only': True}
        # }
