from rest_framework.status import HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User


class UsernameByUserIdView(APIView):
    def get(self, _, user_id):
        try:
            user = User.objects.get(id=user_id)
            username = user.username
            return Response({'username': username})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=HTTP_404_NOT_FOUND)