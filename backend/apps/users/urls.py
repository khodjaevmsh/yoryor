from django.urls import path

from users.views.change_password import ChangePasswordView
from users.views.country import CountryListView
from users.views.profile import ProfileDetailView, ProfileImageListView, ChangeProfileImageView, ProfileImageDetailView, \
    ProfileListView, LikeDetailView, LikeListView
from users.views.region import RegionListView
from users.views.sign_in import SignInView
from users.views.sign_out import SignOutView
from users.views.sign_up import SignUpView, SendConfirmationCodeView, CheckConfirmationCodeView
from users.views.users import UserAllListView

urlpatterns = [
    path('users', UserAllListView.as_view(), name='users'),
    path('send-confirmation-code', SendConfirmationCodeView.as_view(), name='send-confirmation-code'),
    path('check-confirmation-code', CheckConfirmationCodeView.as_view(), name='check-confirmation-code'),
    path('sign-up', SignUpView.as_view(), name='sign-up'),
    path('sign-in', SignInView.as_view(), name='sign-in'),
    path('sign-out', SignOutView.as_view(), name='sign-out'),
    path('change-password', ChangePasswordView.as_view(), name='change-password'),
    path('country', CountryListView.as_view(), name='country-list'),
    path('region', RegionListView.as_view(), name='region-list'),
    path('profiles', ProfileListView.as_view(), name='profile-list'),
    path('profile/<int:pk>', ProfileDetailView.as_view(), name='profile-list'),
    path('profile/images', ProfileImageListView.as_view(), name='profile-images-list'),
    path('profile/image/<int:pk>', ProfileImageDetailView.as_view(), name='profile-image'),
    path('profile/change_images', ChangeProfileImageView.as_view(), name='change-profile-images'),
    path('likes', LikeListView.as_view(), name='like-list'),
    path('like/<int:pk>', LikeDetailView.as_view(), name='like'),
]
