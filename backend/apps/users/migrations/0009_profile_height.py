# Generated by Django 5.0 on 2024-01-03 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_profile_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='height',
            field=models.CharField(blank=True, choices=[('short', "Kichik bo'yli"), ('average', "O'rtacha"), ('tall', "Uzun bo'yli")], max_length=255, null=True),
        ),
    ]