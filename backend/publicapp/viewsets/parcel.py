from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models import Parcel
from ..serializers import ParcelSerializer, LotSerializer
from ..permissions import CustomDjangoModelPermissions
from rest_framework import status


class ParcelViewSet(viewsets.ModelViewSet):
    serializer_class = ParcelSerializer
    permission_classes = [CustomDjangoModelPermissions]

    def get_queryset(self):
        """
        This view should allow access only to the parcels
        related to the authenticated user's company.
        If the user is not logged in, return an empty queryset.
        """
        user = self.request.user
        company = user.company
        if company:
            return Parcel.objects.filter(company=company, is_active=True)
        else:
            return Parcel.objects.none()

    def perform_destroy(self, instance):
        instance.is_active = False

        lots = instance.lot_set.all()
        for lot in lots:
            lot.is_active = False

            inferences = lot.inferencejob_set.filter(is_active=True)
            for inference in inferences:
                inference.is_active = False
                inference.save()

            lot.save()

        instance.save()

    @action(detail=True, methods=["get"], url_path="lots")
    def get_lots(self, request, pk=None):
        parcel = self.get_object()
        lots = parcel.lot_set.all()
        lots = LotSerializer(lots, many=True).data
        return Response(lots)
    
    @action(detail=False, methods=["get"])
    def total(self, request):
        total = Parcel.objects.filter(is_active=True).count()
        return Response({"total": total}, status=status.HTTP_200_OK)
    