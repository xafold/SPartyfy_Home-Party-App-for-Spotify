# Generated by Django 4.2.3 on 2023-08-07 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0005_room_current_song'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='vote_queue',
            field=models.JSONField(default=list),
        ),
    ]
