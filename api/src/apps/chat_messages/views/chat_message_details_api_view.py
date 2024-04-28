from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from ..models import ChatMessage
from ..serializers import ChatMessageSerializer


class ChatMessageDetailsApiView(APIView):
    def get(self, _, pk):
        try:
            chat_message = ChatMessage.objects.get(pk=pk)
            return Response(ChatMessageSerializer(chat_message).data)
        except ChatMessage.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)