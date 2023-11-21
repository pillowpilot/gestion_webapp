from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django_tenants.models import TenantMixin, DomainMixin

# Create your models here.

class Company(TenantMixin):
    name = models.CharField(max_length=100)
    created_on = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = 'companies'
        verbose_name_plural = 'companies'

class CompanyDomain(DomainMixin):
    class Meta:
        verbose_name = 'company domain'
        verbose_name_plural = 'company domains'


class Image(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images')
    def __str__(self):
        return self.title
    