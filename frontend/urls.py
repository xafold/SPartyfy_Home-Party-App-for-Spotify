from django.urls import path
from .views import index, get_csrf_token

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('join', index),
    path('create', index),
    path('csrf_token', get_csrf_token),
    path('room/<str:roomCode>', index),
]