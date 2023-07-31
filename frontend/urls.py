from django.urls import path
from .views import index, get_csrf_token

urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index),
    path('csrf_token', get_csrf_token),
    path('room/<str:roomCode>', index),
]