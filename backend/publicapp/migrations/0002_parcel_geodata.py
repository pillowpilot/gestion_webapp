# Generated by Django 4.2.7 on 2024-01-27 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('publicapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='parcel',
            name='geodata',
            field=models.FileField(null=True, upload_to='geodata_parcels'),
        ),
    ]