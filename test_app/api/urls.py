from django.contrib import admin
from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom

urlpatterns = [
    path('home', RoomView.as_view(), name ='home'),
    path('create-room', CreateRoomView.as_view(), name ='create-room'),
    path('get-room', GetRoom.as_view(), name ='get-room'),
]
