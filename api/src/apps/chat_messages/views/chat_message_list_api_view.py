from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import ChatMessageSerializer
from ..models import ChatMessage


class ChatMessageListApiView(APIView):
    def get(self, _):
        chat_messages = ChatMessage.objects.all().order_by('created_at')
        return Response(ChatMessageSerializer(chat_messages, many=True).data)

    def post(self, request):
        serializer = ChatMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)