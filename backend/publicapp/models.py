from warnings import warn
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django_tenants.models import TenantMixin, DomainMixin
from .managers import CustomUserManager


class Company(TenantMixin):
    """
    Company model for storing the company details. It extends the default django Tenant model.
    """

    name = models.CharField(max_length=100)
    created_on = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "companies"
        verbose_name_plural = "companies"

    def __str__(self) -> str:
        return f"{self.name}"


class CompanyDomain(DomainMixin):
    class Meta:
        verbose_name = "company domain"
        verbose_name_plural = "company domains"


class CustomUser(AbstractUser):
    """
    Custom user model with email as the username field. It extends the default django User model.
    """

    first_name = models.CharField(_("first name"), max_length=50)
    last_name = models.CharField(_("last name"), max_length=50)
    username = None
    email = models.EmailField(_("email address"), unique=True)
    company = models.ForeignKey(
        Company, on_delete=models.SET_NULL, null=True, blank=True
    )
    is_company_manager = models.BooleanField(
        help_text=_(
            "Designates whether this user have administrative privileges over the company it belongs."
        ),
        default=False,
    )
    avatar = models.ImageField(upload_to="avatars", blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    def __str__(self) -> str:
        return self.full_name


class Parcel(models.Model):
    """
    Parcel model for storing the parcel details. It extends the default django Model model.
    A parcel is a (posibly empty) group of lots.
    """

    name = models.CharField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    created_on = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["-created_on"]

    def __str__(self) -> str:
        return f"{self.name}"

    def __repr__(self) -> str:
        return f"Parcel(name={self.name}, company={self.company})"


class Lot(models.Model):
    """
    Lot model for storing the lot details. It extends the default django Model model.
    A lot is a associated with a (posibly empty) group of inferences.
    """

    name = models.CharField(max_length=100)
    parcel = models.ForeignKey(Parcel, on_delete=models.CASCADE)
    created_on = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["-created_on"]

    def __str__(self) -> str:
        return f"{self.name}"

    def __repr__(self) -> str:
        return f"Lot(name={self.name}, parcel={self.parcel})"


class InferenceJob(models.Model):
    """
    Inference jobs model for storing the inference jobs
    """

    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True
    )  # TODO Remove null=True later
    status = models.CharField(max_length=20, default="pending")
    image = models.ImageField(upload_to="inference_jobs")
    model = models.CharField(max_length=20)
    lot = models.ForeignKey(Lot, on_delete=models.CASCADE, null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    task_id = models.CharField(max_length=100, null=True)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_on"]

    def __str__(self):
        return self.image.name


class Image(models.Model):
    """Image model for uploading"""

    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="images")

    def __init__(self, *args, **kwargs):
        warn(
            f"{self.__class__.__name__} will be deprecated",
            DeprecationWarning,
            stacklevel=2,
        )
        super().__init__(*args, **kwargs)

    def __str__(self):
        return self.title


class AnnotatedImages(models.Model):
    """Annotated images model for storing the annotated images"""

    leaves_annotations = models.ImageField(upload_to="annotated_images")
    fruits_annotations = models.ImageField(upload_to="annotated_images")

    def __init__(self, *args, **kwargs):
        warn(
            f"{self.__class__.__name__} will be deprecated",
            DeprecationWarning,
            stacklevel=2,
        )
        super().__init__(*args, **kwargs)

    def __str__(self):
        return self.leaves_annotations.name
