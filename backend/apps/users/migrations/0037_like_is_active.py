# Generated by Django 5.0 on 2024-05-24 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0036_alter_like_receiver_alter_like_sender'),
    ]

    operations = [
        migrations.AddField(
            model_name='like',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]