from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from ..models import Company
from ..serializers import CompanySerializer, ParcelSerializer, LotSerializer


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAdminUser]

    @action(detail=True, methods=['get'], url_path='parcels')
    def get_parcels(self, request, pk=None):
        company = self.get_object()
        parcels = company.parcel_set.all()
        parcels = ParcelSerializer(parcels, many=True).data
        return Response(parcels)
    
    @action(detail=True, methods=['get'], url_path='lots')
    def get_lots(self, request, pk=None):
        company = self.get_object()
        parcels = company.parcel_set.all()
        lots = []
        for parcel in parcels:
            lots.extend(parcel.lot_set.all())
        lots = LotSerializer(lots, many=True).data
        return Response(lots)
