# Create your views here.
from django.shortcuts import render


def index(request):
    return render(request, "web/index.html")


def delete(request):
    return render(request, "web/account-deletion.html")
