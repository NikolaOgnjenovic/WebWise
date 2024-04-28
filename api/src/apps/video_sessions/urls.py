from rest_framework.urls import path
from .views import VideoSessionListAPIView, VideoSessionDetailsAPIView


urlpatterns = [
    path('video_sessions/', VideoSessionListAPIView.as_view()),
    path('video_sessions/<int:pk>/', VideoSessionDetailsAPIView.as_view()),
]
