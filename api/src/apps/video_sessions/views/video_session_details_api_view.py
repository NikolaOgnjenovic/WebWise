from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from ..models import VideoSession
from ..serializers import VideoSessionSerializer


class VideoSessionDetailsAPIView(APIView):
    def get(self, _, pk):
        try:
            video_session = VideoSession.objects.get(pk=pk)
            return Response(VideoSessionSerializer(video_session).data, status=HTTP_200_OK)
        except VideoSession.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)
