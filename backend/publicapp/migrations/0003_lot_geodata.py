# Generated by Django 4.2.7 on 2024-01-29 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('publicapp', '0002_parcel_geodata'),
    ]

    operations = [
        migrations.AddField(
            model_name='lot',
            name='geodata',
            field=models.FileField(null=True, upload_to='geodata_lots'),
        ),
    ]
