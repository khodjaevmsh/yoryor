# Generated by Django 5.0 on 2024-03-03 00:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_message_is_read'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='is_read',
            new_name='seen',
        ),
    ]
