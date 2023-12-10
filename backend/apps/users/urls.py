from django.urls import path

from users.views.send_verification_code import SendVerificationCodeView, ConfirmCodeView
from users.views.users import UserAllListView

urlpatterns = [
    path('users', UserAllListView.as_view(), name='users'),
    path('send-verification-code', SendVerificationCodeView.as_view(), name='send-verification-code'),
    path('confirm-code', ConfirmCodeView.as_view(), name='confirm-code'),
]
