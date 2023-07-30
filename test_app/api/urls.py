from django.contrib import admin
from django.urls import path
from .views import RoomView, CreateRoomView

urlpatterns = [
    path('home/', RoomView.as_view(), name ='home'),
    path('create-room/', CreateRoomView.as_view(), name ='create-room'),
]
