# Generated by Django 5.0 on 2024-01-05 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_profile_bio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='height',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
