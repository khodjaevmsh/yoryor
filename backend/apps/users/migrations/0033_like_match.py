# Generated by Django 5.0 on 2024-05-08 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0032_remove_like_like'),
    ]

    operations = [
        migrations.AddField(
            model_name='like',
            name='match',
            field=models.BooleanField(default=False),
        ),
    ]