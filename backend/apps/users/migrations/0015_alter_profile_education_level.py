# Generated by Django 5.0 on 2024-01-06 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_profile_education_level_profile_education_school_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='education_level',
            field=models.CharField(choices=[('high_school', "O'rta maxsus"), ('bachelors_degree', 'Bakalavr'), ('masters_degree', 'Magistratura'), ('doctorate', 'Doktorantura'), ('other', 'Boshqasi')], default=1, max_length=20),
            preserve_default=False,
        ),
    ]
