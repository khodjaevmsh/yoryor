# Generated by Django 5.0 on 2024-03-03 01:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_rename_is_read_message_seen'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='updated_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]