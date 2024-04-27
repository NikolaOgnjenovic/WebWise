from django.urls import path
from .views import VideosView, VideosByUploaderView, VideoByIdView

urlpatterns = [
    path('videos/', VideosView.as_view()),
    path('videos/uploader/<str:uploader_id>/', VideosByUploaderView.as_view()),
    path('videos/<str:video_id>/', VideoByIdView.as_view()),
]
