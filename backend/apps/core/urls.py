from django.urls import path

from core.views.configurations import ConfigurationsView

urlpatterns = [
    path('configurations', ConfigurationsView.as_view(), name='configurations'),
]
