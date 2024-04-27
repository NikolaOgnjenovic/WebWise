from django.urls import path
from .views import VideoDetailsAPIVIew, VideosByUploaderView, VideoListAPIVIew

urlpatterns = [
    path('videos/', VideoListAPIVIew.as_view()),
    path('videos/uploader/<str:uploader_id>/', VideosByUploaderView.as_view()),
    path('videos/<str:video_id>/', VideoDetailsAPIVIew.as_view()),
]
