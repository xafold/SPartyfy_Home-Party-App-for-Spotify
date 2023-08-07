from django.db import models
from test_app.models import *

# Create your models here.

class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=512)
    access_token = models.CharField(max_length=512)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=512)
    
class Vote(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    song_id = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
