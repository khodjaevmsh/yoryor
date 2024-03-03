# Generated by Django 5.0 on 2024-02-26 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0029_profile_online'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='online',
        ),
        migrations.AddField(
            model_name='user',
            name='last_seen',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='online',
            field=models.BooleanField(default=False),
        ),
    ]
