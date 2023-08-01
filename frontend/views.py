from django.shortcuts import render
from django.http import JsonResponse
from django.middleware.csrf import get_token

# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def get_csrf_token(request):
    # Generate a CSRF token for the current session
    csrf_token = get_token(request)

    return JsonResponse({'csrfToken': csrf_token})
