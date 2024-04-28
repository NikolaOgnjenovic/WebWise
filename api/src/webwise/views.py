from rest_framework.response import Response
from rest_framework.views import APIView


class IndexApiView(APIView):
    @staticmethod
    def get(_) -> Response:
        return Response({'message': 'Welcome to WebWise API!'})
