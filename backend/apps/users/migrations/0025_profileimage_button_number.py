# Generated by Django 5.0 on 2024-01-11 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0024_alter_profile_zodiac'),
    ]

    operations = [
        migrations.AddField(
            model_name='profileimage',
            name='button_number',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
