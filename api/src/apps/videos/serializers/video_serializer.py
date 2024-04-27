from rest_framework import serializers
from ..models import Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('title', 'thumbnail_url', 'video_url', 'user_id', 'id')
        extra_kwargs = {'id': {'read_only': True}}

    def create(self, validated_data):
        video = Video.objects.create(**validated_data)
        return video
