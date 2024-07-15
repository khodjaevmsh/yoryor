from django.contrib import admin

# Register your models here.
from main.models import Profile, ProfileImage, Country, Region, Like, Dislike


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ('title', 'country',)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'region',)


@admin.register(ProfileImage)
class ProfileImageAdmin(admin.ModelAdmin):
    list_display = ('profile', 'image',)


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    pass


@admin.register(Dislike)
class DislikeAdmin(admin.ModelAdmin):
    pass
