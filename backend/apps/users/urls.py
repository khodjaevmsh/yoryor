from django.urls import path

from users.views.change_password import ChangePasswordView
from users.views.confirmation_code import SendConfirmationCodeView, CheckConfirmationCodeView
from users.views.country import CountryListView
from users.views.device_token import DeviceTokenView
from users.views.dislike import DislikeListView, DislikeDetailView
from users.views.forgot_password import ForgotPasswordView
from users.views.like import LikeListView, LikeDetailView, CountOfLikesView
from users.views.profile import ProfileListView, ProfileDetailView
from users.views.profile_image import ProfileImageListView, ProfileImageDetailView, ChangeProfileImageView, \
    SingleProfileImageView
from users.views.region import RegionListView
from users.views.sign_in import SignInView
from users.views.sign_out import SignOutView
from users.views.sign_up import SignUpView
from users.views.users import UserAllListView

urlpatterns = [
    path('users', UserAllListView.as_view(), name='users'),
    path('send-confirmation-code', SendConfirmationCodeView.as_view(), name='send-confirmation-code'),
    path('check-confirmation-code', CheckConfirmationCodeView.as_view(), name='check-confirmation-code'),
    path('sign-up', SignUpView.as_view(), name='sign-up'),
    path('sign-in', SignInView.as_view(), name='sign-in'),
    path('sign-out', SignOutView.as_view(), name='sign-out'),
    path('forgot-password', ForgotPasswordView.as_view(), name='forgot-password'),
    path('change-password', ChangePasswordView.as_view(), name='change-password'),
    path('country', CountryListView.as_view(), name='country-list'),
    path('region', RegionListView.as_view(), name='region-list'),
    path('profiles', ProfileListView.as_view(), name='profile-list'),
    path('profile/<int:pk>', ProfileDetailView.as_view(), name='profile-list'),
    path('profile/images', ProfileImageListView.as_view(), name='profile-images-list'),
    path('profile/image/<int:pk>', ProfileImageDetailView.as_view(), name='profile-image'),
    path('profile/change_images', ChangeProfileImageView.as_view(), name='change-profile-images'),
    path('profile/image', SingleProfileImageView.as_view(), name='profile-image'),
    path('likes', LikeListView.as_view(), name='like-list'),
    path('like/<int:pk>', LikeDetailView.as_view(), name='like'),
    path('dislikes', DislikeListView.as_view(), name='dislike-list'),
    path('dislike/<int:pk>', DislikeDetailView.as_view(), name='dislike'),
    path('count-of-likes', CountOfLikesView.as_view(), name='count-of-likes'),
    path('device-token', DeviceTokenView.as_view(), name='device-token'),
]
