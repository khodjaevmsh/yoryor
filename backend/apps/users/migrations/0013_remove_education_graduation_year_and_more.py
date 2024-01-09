# Generated by Django 5.0 on 2024-01-06 13:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_education'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='education',
            name='graduation_year',
        ),
        migrations.AlterField(
            model_name='education',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='educations', to='users.profile'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='gender',
            field=models.CharField(choices=[('male', 'Erkak'), ('female', 'Ayol'), ('other', 'Boshqasi')], max_length=255),
        ),
    ]