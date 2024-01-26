"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, reverse
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
    TokenVerifyView,
)
from .views import public_index, whoiam
from .viewsets.user import UserViewSet
from .viewsets.company import CompanyViewSet
from .viewsets.parcel import ParcelViewSet
from .viewsets.lot import LotViewSet
from .viewsets.inference import InferenceViewSet
from django.utils.functional import lazy


def public_reverse(viewname, args=None, kwargs=None, current_app=None):
    """
    Url reverse resolver function for public urls.
    See: https://github.com/django-tenants/django-tenants/issues/469#issuecomment-709319679
    """
    return reverse(
        viewname,
        urlconf=settings.PUBLIC_SCHEMA_URLCONF,
        args=args,
        kwargs=kwargs,
        current_app=current_app,
    )


def tenant_reverse(viewname, args=None, kwargs=None, current_app=None):
    """
    Url reverse resolver function for tenant urls.
    See: https://github.com/django-tenants/django-tenants/issues/469#issuecomment-709319679
    """
    return reverse(
        viewname,
        urlconf=settings.ROOT_URLCONF,
        args=args,
        kwargs=kwargs,
        current_app=current_app,
    )


public_reverse_lazy = lazy(public_reverse, str)
tenant_reverse_lazy = lazy(tenant_reverse, str)

router = DefaultRouter()
router.register(r"api/companies", CompanyViewSet, basename="company")
router.register(r"api/parcels", ParcelViewSet, basename="parcel")
router.register(r"api/lots", LotViewSet, basename="lot")
router.register(r"api/inferences", InferenceViewSet, basename="inference")
router.register(r"api/users", UserViewSet, basename="user")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/blacklist/", TokenBlacklistView.as_view(), name="token_blacklist"),
    path("api/token/verify", TokenVerifyView.as_view(), name="token_verify"),
    path("api/whoami/", whoiam),
    path("", public_index),
]

urlpatterns += router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
