from .serializers import TicketSerializer, TicketCreateSerializer, CommentSerializer
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status
from rest_framework import permissions, authentication, generics
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from comments.models import Comment


class CommentsListView(ListAPIView):
    serializer_class = TicketSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.AllowAny]

    # def create(self, request, *args, **kwargs):
    #     # Copy parsed content from HTTP request
    #     data = request.data.copy()

    #     # Add id of currently logged user
    #     data['owner'] = request.user.id
    #     data['username'] = request.user.id

    #     # Default behavior but pass our modified data instead
    #     serializer = self.get_serializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
