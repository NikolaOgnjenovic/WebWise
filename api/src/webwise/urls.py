"""
URL configuration for webwise project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import IndexApiView
from apps.users.urls import urlpatterns as users_urlpatterns
from apps.videos.urls import urlpatterns as videos_urlpatterns
from apps.chat_messages.urls import urlpatterns as chat_messages_urlpatterns
from apps.video_sessions.urls import urlpatterns as video_sessions_urlpatterns

api_urlpatterns = [
    path('', IndexApiView.as_view()),
    path('admin/', admin.site.urls),
    *users_urlpatterns,
    *videos_urlpatterns,
    *chat_messages_urlpatterns,
    *video_sessions_urlpatterns,
]

urlpatterns = [
    path('api/v1/', include(api_urlpatterns)),
]
