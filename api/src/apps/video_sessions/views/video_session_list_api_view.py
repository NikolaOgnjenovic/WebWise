from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from ..models import VideoSession
from ..serializers import VideoSessionSerializer


class VideoSessionListAPIView(APIView):
    def get(self, _):
        video_sessions = VideoSession.objects.all()
        return Response(VideoSessionSerializer(video_sessions, many=True).data, status=HTTP_200_OK)

    def post(self, request):
        serializer = VideoSessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
