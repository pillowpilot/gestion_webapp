from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.sessions.models import Session
from django_tenants.admin import TenantAdminMixin
from .models import CustomUser, Company, CompanyDomain, Parcel, Lot, InferenceJob
from .forms import CustomUserCreationForm, CustomUserChangeForm
from django.contrib.auth.admin import UserAdmin


@admin.register(Company)
class CompanyAdmin(TenantAdminMixin, admin.ModelAdmin):
    list_display = ("id", "name", "schema_name")


@admin.register(CompanyDomain)
class CompanyDomainAdmin(admin.ModelAdmin):
    list_display = ("domain", "tenant")


@admin.register(Parcel)
class ParcelAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "company", "created_on", "updated_on")


@admin.register(Lot)
class LotAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "parcel", "created_on", "updated_on")


@admin.register(InferenceJob)
class InferenceJobAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "lot",
        "user",
        "model",
        "task_id",
        "status",
        "latitude",
        "longitude",
        "created_on",
        "updated_on",
    )


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    """
    Define the admin page for the custom user model.
    """

    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = (
        "id",
        "email",
        "first_name",
        "last_name",
        "company",
        "is_company_manager",
        "is_staff",
        "is_active",
        "created_on",
        "updated_on",
    )
    list_filter = (
        "email",
        "is_staff",
        "is_active",
    )
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "company",
                    "password",
                    "avatar",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_active",
                    "is_company_manager",
                    "groups",
                    "user_permissions",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "company",
                    "is_staff",
                    "is_company_manager",
                    "is_active",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)


@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    def _session_data(self, obj):
        return obj.get_decoded()

    list_display = ["session_key", "_session_data", "expire_date"]
    readonly_fields = ["_session_data"]
