from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import ChatMessage
from ..serializers import ChatMessageSerializer


class ChatMessageDetailsApiView(APIView):
    def get(self, _, pk):
        chat_message = ChatMessage.objects.get(pk=pk)
        return Response(ChatMessageSerializer(chat_message).data)