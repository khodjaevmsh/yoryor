from django.urls import path

from users.views.change_password import ChangePasswordView
from users.views.confirmation_code import SendConfirmationCodeView, CheckConfirmationCodeView
from users.views.device_token import DeviceTokenView
from users.views.forgot_password import ForgotPasswordView
from users.views.sign_in import SignInView
from users.views.sign_out import SignOutView
from users.views.sign_up import SignUpView
from users.views.users import UserAllListView, UserDetailView

urlpatterns = [
    path('users', UserAllListView.as_view(), name='users'),
    path('user/<int:pk>', UserDetailView.as_view(), name='user'),
    path('send-confirmation-code', SendConfirmationCodeView.as_view(), name='send-confirmation-code'),
    path('check-confirmation-code', CheckConfirmationCodeView.as_view(), name='check-confirmation-code'),
    path('sign-up', SignUpView.as_view(), name='sign-up'),
    path('sign-in', SignInView.as_view(), name='sign-in'),
    path('sign-out', SignOutView.as_view(), name='sign-out'),
    path('forgot-password', ForgotPasswordView.as_view(), name='forgot-password'),
    path('change-password', ChangePasswordView.as_view(), name='change-password'),
    path('device-token', DeviceTokenView.as_view(), name='device-token'),
]
