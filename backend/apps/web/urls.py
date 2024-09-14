from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('account-deletion', views.delete, name='account-deletion'),
]
