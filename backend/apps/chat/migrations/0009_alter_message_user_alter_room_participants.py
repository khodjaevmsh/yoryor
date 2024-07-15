# Generated by Django 5.0 on 2024-07-15 10:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0008_rename_timestamp_message_created_at'),
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to='main.profile'),
        ),
        migrations.AlterField(
            model_name='room',
            name='participants',
            field=models.ManyToManyField(related_name='rooms', to='main.profile'),
        ),
    ]
