from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from ..models import VideoSession
from ..serializers import VideoSessionSerializer


class VideoSessionDetailsAPIView(APIView):
    def get(self, _, pk):
        video_sessions = VideoSession.objects.filter(pk=pk)
        return Response(VideoSessionSerializer(video_sessions).data, status=HTTP_200_OK)
