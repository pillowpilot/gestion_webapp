from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from ..models import CustomUser
from ..serializers import CustomUserSerializer
from ..permissions import CustomDjangoModelPermissions


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    permission_classes = [CustomDjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user
        company = user.company
        if company:
            return CustomUser.objects.filter(company=company)
        else:
            return CustomUser.objects.none()
