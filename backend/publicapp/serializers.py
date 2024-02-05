from rest_framework import serializers
from .models import CustomUser, Company, InferenceJob, Parcel, Lot


class SimpleCustomUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    is_company_manager = serializers.BooleanField()


class CompanySerializer(serializers.ModelSerializer):
    customuser_set = SimpleCustomUserSerializer(many=True, read_only=True)

    class Meta(object):
        model = Company
        fields = ("id", "name", "customuser_set")


class CustomUserSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(
        allow_null=True, queryset=Company.objects.all()
    )

    class Meta(object):
        model = CustomUser
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "is_company_manager",
            "company",
        )


class ParcelSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.name", read_only=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())

    class Meta(object):
        model = Parcel
        fields = (
            "id",
            "name",
            "company_name",
            "company",
            "geodata",
            "created_on",
            "updated_on",
        )


class LotSerializer(serializers.ModelSerializer):
    parcel_name = serializers.CharField(source="parcel.name", read_only=True)
    parcel = serializers.PrimaryKeyRelatedField(queryset=Parcel.objects.all())

    class Meta(object):
        model = Lot
        fields = (
            "id",
            "name",
            "parcel_name",
            "parcel",
            "geodata",
            "created_on",
            "updated_on",
        )


class InferenceJobSerializer(serializers.ModelSerializer):
    user = SimpleCustomUserSerializer(read_only=True)
    lot_name = serializers.CharField(source="lot.name", read_only=True)
    lot = serializers.PrimaryKeyRelatedField(queryset=Lot.objects.all())
    image_thumbnail = serializers.ImageField(read_only=True)

    class Meta(object):
        model = InferenceJob
        fields = (
            "id",
            "user",
            "created_on",
            "updated_on",
            "lot",
            "lot_name",
            "image",
            "image_thumbnail",
            "status",
            "model",
            "task_id",
            "latitude",
            "longitude",
        )
