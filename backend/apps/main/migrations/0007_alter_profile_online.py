# Generated by Django 5.0 on 2024-07-24 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_profile_online'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='online',
            field=models.CharField(blank=True, choices=[('online', 'Online'), ('offline', 'Offline')], max_length=20, null=True),
        ),
    ]
