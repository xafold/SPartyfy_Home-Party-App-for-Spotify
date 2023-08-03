from django.contrib import admin
from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom,LeaveRoom,UpdateRoom

urlpatterns = [
    path('home', RoomView.as_view(), name ='home'),
    path('create-room', CreateRoomView.as_view(), name ='create-room'),
    path('get-room', GetRoom.as_view(), name ='get-room'),
    path('join-room', JoinRoom.as_view(), name ='join-room'),
    path('user-in-room', UserInRoom.as_view(), name ='user-in-room'),
    path('leave-room', LeaveRoom.as_view(), name ='leave-room'),
    path('update-room', UpdateRoom.as_view(), name ='update-room'),
]
