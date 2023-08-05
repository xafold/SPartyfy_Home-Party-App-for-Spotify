from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view(), name='get-auth-url'),
    path('redirect',spotify_callback, name='redirect'),
    path('is-authenticated',IsAuthenticated.as_view(), name='is-authenticated'),
    path('current-song',CurrentSong.as_view(), name='current-song'),
    path('play',PlaySong.as_view(), name='play'),
    path('pause',PauseSong.as_view(), name='pause'),
    path('skip',SkipSong.as_view(), name='skip'),
]