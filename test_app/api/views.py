from rest_framework import generics
from django.shortcuts import render
from test_app.models import Room
from .serializers import RoomSerializer

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    