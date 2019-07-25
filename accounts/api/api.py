from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class RegisterationAPI(generics.GenericAPIView):
    serilizer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serilizer = self.get_serializer(data=request.data)
        serilizer.is_valid(raise_exception=True)
        user = serilizer.save()
        return Response({'user': UserSerializer(user, context=self.get_serializer_context()).data, 'token':
                         AuthToken.objects.create(user)})


class LoginAPI(generics.GenericAPIView):
    serilizer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serilizer = self.get_serializer(data=request.data)
        serilizer.is_valid(raise_exception=True)
        user = serilizer.validated_data
        return Response({'user': UserSerializer(user, context=self.get_serializer_context()).data, 'token':
                         AuthToken.objects.create(user)})


class UserAPI(generics.RetrieveAPIView):
    permissions._classes = [
        permissions.IsAuthenticated,
    ]
    serilizer_class = UserSerializer

    def get_object(self):
        return self.request.user
