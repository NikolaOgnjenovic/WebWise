from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import logout


class UserLogoutView(APIView):
    def get(self, request):
        logout(request)
        return Response({'message': 'Successfully logged out.'})