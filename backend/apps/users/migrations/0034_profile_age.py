# Generated by Django 5.0 on 2024-05-19 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0033_like_match'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='age',
            field=models.CharField(blank=True, null=True),
        ),
    ]