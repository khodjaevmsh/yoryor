# Generated by Django 5.0 on 2024-01-07 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0021_profile_weight'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='zodiac',
            field=models.CharField(choices=[('aries', 'Dalv'), ('taurus', 'Baliq'), ('gemini', "Qo'y"), ('cancer', 'Buzoq'), ('leo', 'Egizaklar'), ('virgo', 'Qisqichbaqa'), ('libra', 'Arslon'), ('scorpio', 'Sunbula'), ('sagittarius', 'Tarazu'), ('capricorn', 'Chayon'), ('aquarius', 'Qavs'), ('pisces', 'Tog’ echkisi')], default=1, max_length=20),
            preserve_default=False,
        ),
    ]
