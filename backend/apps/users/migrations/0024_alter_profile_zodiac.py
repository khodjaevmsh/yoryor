# Generated by Django 5.0 on 2024-01-07 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0023_alter_profile_zodiac'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='zodiac',
            field=models.CharField(blank=True, choices=[('aries', "Qo'y"), ('taurus', 'Buqa'), ('gemini', 'Egizaklar'), ('cancer', 'Qisqichbaqa'), ('leo', 'Arslon'), ('virgo', 'Parizod'), ('libra', 'Tarozi'), ('scorpio', 'Chayon'), ('sagittarius', "O'q otar"), ('capricorn', "Tog' echkisi"), ('aquarius', "Qovg'a"), ('pisces', 'Baliqlar')], max_length=20, null=True),
        ),
    ]
