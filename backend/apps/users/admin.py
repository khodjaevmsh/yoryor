from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import User, ConfirmationCode


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('phone_number', 'is_active', 'last_login',)
    fieldsets = (
        (None, {'fields': ('username', 'email', 'phone_number', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('last_login', 'date_joined')})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


@admin.register(ConfirmationCode)
class ConfirmationCodeAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'confirmation_code',)
