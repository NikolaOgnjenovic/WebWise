from django.urls import path
from .views import UserRegistrationView, UserLoginView, UserLogoutView, UsernameByUserIdView


urlpatterns = [
    path('/users/<str:user_id>/username/', UsernameByUserIdView.as_view()),
    path('register/', UserRegistrationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('logout/', UserLogoutView.as_view()),
]