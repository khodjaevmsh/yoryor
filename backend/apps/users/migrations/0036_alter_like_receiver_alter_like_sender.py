# Generated by Django 5.0 on 2024-05-23 08:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0035_remove_profile_age'),
    ]

    operations = [
        migrations.AlterField(
            model_name='like',
            name='receiver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver_like', to='users.profile'),
        ),
        migrations.AlterField(
            model_name='like',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender_like', to='users.profile'),
        ),
    ]
