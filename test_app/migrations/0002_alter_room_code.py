# Generated by Django 4.2.3 on 2023-08-01 17:16

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]
