from django.urls import path

from users.views.country import CountryListView
from users.views.region import RegionListView
from users.views.sign_in import SignInView
from users.views.sign_out import SignOutView
from users.views.sign_up import SignUpView, SendConfirmationCodeView, CheckConfirmationCodeView
from users.views.users import UserAllListView

urlpatterns = [
    path('users', UserAllListView.as_view(), name='users'),
    path('send-confirmation-code', SendConfirmationCodeView.as_view(), name='send-confirmation-code'),
    path('check-confirmation-code', CheckConfirmationCodeView.as_view(), name='check-confirmation-code'),
    path('country', CountryListView.as_view(), name='country'),
    path('region', RegionListView.as_view(), name='region'),
    path('sign-up', SignUpView.as_view(), name='sign-up'),
    path('sign-in', SignInView.as_view(), name='sign-in'),
    path('sign-out', SignOutView.as_view(), name='sign-out'),
]
