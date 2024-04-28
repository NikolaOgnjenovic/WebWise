from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from ..models import Video
from ..serializers import VideoSerializer


class VideoDetailsAPIVIew(APIView):
    def get(self, _, uploader_id=None):
        videos = Video.objects.filter(uploader_id=uploader_id)
        serializer = VideoSerializer(data=videos, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
