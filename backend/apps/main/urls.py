from django.urls import path

from core.views.configurations import ConfigurationsView
from main.views.country import CountryListView
from main.views.dislike import DislikeListView, DislikeDetailView
from main.views.like import LikeListView, LikeDetailView, CountOfLikesView
from main.views.profile import ProfileListView, ProfileDetailView
from main.views.profile_image import ProfileImageListView, ProfileImageDetailView, ChangeProfileImageView, \
    SingleProfileImageView
from main.views.region import RegionListView

urlpatterns = [
    path('', ConfigurationsView.as_view(), name='configurations'),
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
]
