# Generated by Django 5.0 on 2024-01-07 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0020_alter_profile_gender_alter_profile_goal_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='weight',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
