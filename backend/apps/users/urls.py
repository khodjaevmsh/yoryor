from django.urls import path

from users.views.sign_up import SignUpView, ConfirmCodeView, SetPasswordView
from users.views.users import UserAllListView

urlpatterns = [
    path('users', UserAllListView.as_view(), name='users'),
    path('sign-up', SignUpView.as_view(), name='sign-up'),
    path('confirm-code', ConfirmCodeView.as_view(), name='confirm-code'),
    path('set-password', SetPasswordView.as_view(), name='set-password'),
]
