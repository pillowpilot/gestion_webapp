from django.contrib import admin
from django_tenants.admin import TenantAdminMixin
from .models import Company, CompanyDomain

# Register your models here.

@admin.register(Company)
class CompanyAdmin(TenantAdminMixin, admin.ModelAdmin):
    list_display = ('name',)

@admin.register(CompanyDomain)
class CompanyDomainAdmin(admin.ModelAdmin):
    pass