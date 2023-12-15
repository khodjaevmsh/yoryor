from django.urls import path

from users.views.profile import SetNameView
from users.views.sign_up import SignUpView, SendConfirmationCodeView, CheckConfirmationCodeView
from users.views.users import UserAllListView

urlpatterns = [
    path('users', UserAllListView.as_view(), name='users'),
    path('send-confirmation-code', SendConfirmationCodeView.as_view(), name='send-confirmation-code'),
    path('check-confirmation-code', CheckConfirmationCodeView.as_view(), name='check-confirmation-code'),
    path('sign-up', SignUpView.as_view(), name='sign-up'),
    path('set-name', SetNameView.as_view(), name='set-name'),
]
