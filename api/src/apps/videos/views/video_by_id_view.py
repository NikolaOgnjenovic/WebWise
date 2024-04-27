from rest_framework.views import APIView
from rest_framework.response import Response

from src.apps.videos.models import Video
from src.apps.videos.serializers import VideoSerializer


class VideoByIdView(APIView):
    def get(self, _, uploader_id=None):
        videos = Video.objects.filter(uploader_id=uploader_id)
        serializer = VideoSerializer(data=videos, many=True)
        return Response(serializer.data)
