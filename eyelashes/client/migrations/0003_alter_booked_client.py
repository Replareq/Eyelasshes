# Generated by Django 4.1.5 on 2023-01-13 07:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0002_alter_client_options_booked'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booked',
            name='client',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='client.client'),
        ),
    ]
