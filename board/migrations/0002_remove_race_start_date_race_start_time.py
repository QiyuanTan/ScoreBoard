# Generated by Django 5.0.3 on 2024-03-20 14:05

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='race',
            name='start_date',
        ),
        migrations.AddField(
            model_name='race',
            name='start_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
