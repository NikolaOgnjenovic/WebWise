from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Video
from ..serializers import VideoSerializer


class VideosByUploaderView(APIView):
    def get(self, uploader_id=None):
        try:
            video = Video.objects.get(pk=uploader_id)
            serializer = VideoSerializer(video)
            return Response(serializer.data, status=HTTP_200_OK)
        except Video.DoesNotExist:
            return Response(status=HTTP_404_NOT_FOUND)
