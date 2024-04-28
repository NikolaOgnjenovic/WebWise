from rest_framework.urls import path
from .views import ChatMessageListApiView, ChatMessageDetailsApiView


urlpatterns = [
    path('messages/', ChatMessageListApiView.as_view()),
    path('messages/<int:pk>/', ChatMessageDetailsApiView.as_view())
]