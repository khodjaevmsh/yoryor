# Generated by Django 5.0 on 2024-06-20 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0039_alter_like_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='marital_status',
            field=models.CharField(blank=True, choices=[('single', "Yolg'iz"), ('married', 'Turmush qurgan'), ('divorced', 'Ajrashgan'), ('widowed', 'Beva'), ('engaged', 'Unashtirilgan'), ('relationship', 'Munosabatda'), ('other', 'Boshqasi')], max_length=20, null=True),
        ),
    ]
