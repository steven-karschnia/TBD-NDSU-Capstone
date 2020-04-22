from django.contrib.auth.models import User, Group, UserManager
from django.contrib.auth import authenticate
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import UserSerializer, GroupSerializer, ProjectSerializer
from api.models import Project
import json


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
def create_auth(request):
    data = request.data
    user = User.objects.create_user(
        data['username'],
        data['email'],
        data['password']
    )
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    if user is not None:
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    data = request.data
    user = authenticate(username=data['username'], password=data['password'])
    if user is not None:
        return Response('Logged in',status=status.HTTP_200_OK)
    else:
        return Response('Incorrect Login',status=status.HTTP_400_BAD_REQUEST)
