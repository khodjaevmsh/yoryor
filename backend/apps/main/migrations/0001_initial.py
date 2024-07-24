# Generated by Django 5.0 on 2024-07-15 10:28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=155)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=55, null=True)),
                ('birthdate', models.DateField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, choices=[('male', 'Erkak'), ('female', 'Ayol'), ('other', 'Boshqasi')], max_length=20, null=True)),
                ('goal', models.CharField(blank=True, choices=[('match', 'Juftlik topish'), ('friendship', "Do'st ortirish"), ('long_term_dating', 'Uzoq muddatli tanishuv'), ('short_term_dating', 'Qisqa muddatli tanishuv')], max_length=20, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('height', models.CharField(blank=True, max_length=20, null=True)),
                ('weight', models.CharField(blank=True, max_length=20, null=True)),
                ('education_level', models.CharField(blank=True, choices=[('high_school', "O'rta maxsus"), ('bachelors_degree', 'Bakalavr'), ('masters_degree', 'Magistratura'), ('doctorate', 'Doktorantura'), ('other', 'Boshqasi')], max_length=20, null=True)),
                ('education_school', models.CharField(blank=True, max_length=85, null=True)),
                ('job_title', models.CharField(blank=True, max_length=85, null=True)),
                ('job_company', models.CharField(blank=True, max_length=85, null=True)),
                ('marital_status', models.CharField(blank=True, choices=[('single', "Yolg'iz"), ('married', 'Turmush qurgan'), ('divorced', 'Ajrashgan'), ('widowed', 'Beva'), ('engaged', 'Unashtirilgan'), ('relationship', 'Munosabatda'), ('other', 'Boshqasi')], max_length=20, null=True)),
                ('income_level', models.CharField(blank=True, choices=[('low', 'Past daromad'), ('moderate', "O'rtacha daromad"), ('above_moderate', "O'rtacha daromaddan yuqori"), ('high', 'Yuqori daromad'), ('very_high', 'Juda yuqori daromad')], max_length=20, null=True)),
                ('zodiac', models.CharField(blank=True, choices=[('aries', "Qo'y"), ('taurus', 'Buqa'), ('gemini', 'Egizaklar'), ('cancer', 'Qisqichbaqa'), ('leo', 'Arslon'), ('virgo', 'Parizod'), ('libra', 'Tarozi'), ('scorpio', 'Chayon'), ('sagittarius', "O'q otar"), ('capricorn', "Tog' echkisi"), ('aquarius', "Qovg'a"), ('pisces', 'Baliqlar')], max_length=20, null=True)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ProfileImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='profile')),
                ('button_number', models.IntegerField(blank=True, null=True)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=155)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.country')),
            ],
        ),
        migrations.AddField(
            model_name='profile',
            name='region',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.region'),
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('match', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver_like', to='main.profile')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender_like', to='main.profile')),
            ],
            options={
                'unique_together': {('sender', 'receiver')},
            },
        ),
        migrations.CreateModel(
            name='Dislike',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver_dislike', to='main.profile')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender_dislike', to='main.profile')),
            ],
            options={
                'unique_together': {('sender', 'receiver')},
            },
        ),
    ]