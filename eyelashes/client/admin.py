from django.contrib import admin
from .models import Client, Booked

# Register your models here.
admin.site.register(Client)
admin.site.register(Booked)
