# Generated by Django 5.0 on 2024-06-28 11:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0007_room_updated_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='timestamp',
            new_name='created_at',
        ),
    ]