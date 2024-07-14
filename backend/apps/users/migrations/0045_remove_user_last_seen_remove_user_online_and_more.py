# Generated by Django 5.0 on 2024-07-09 05:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0044_remove_device_profile_device_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='last_seen',
        ),
        migrations.RemoveField(
            model_name='user',
            name='online',
        ),
        migrations.AddField(
            model_name='user',
            name='country_code',
            field=models.IntegerField(default=998),
        ),
    ]
