# Generated by Django 5.0 on 2024-02-25 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
        ('users', '0028_like'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='participants',
            field=models.ManyToManyField(related_name='rooms', to='users.profile'),
        ),
    ]
