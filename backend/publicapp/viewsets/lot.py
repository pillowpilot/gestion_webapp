from rest_framework import viewsets
from ..models import Lot
from ..serializers import LotSerializer
from ..permissions import CustomDjangoModelPermissions


class LotViewSet(viewsets.ModelViewSet):
    serializer_class = LotSerializer
    permission_classes = [CustomDjangoModelPermissions]

    def get_queryset(self):
        """
        This view should only return lots
        related to the logged in user's company.
        If the user is not logged in, return an empty queryset.
        """
        user = self.request.user
        company = user.company
        
        if company:
            return Lot.objects.filter(parcel__company=company)
        else:
            return Lot.objects.none()
