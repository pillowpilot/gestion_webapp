from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
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
            return Lot.objects.filter(parcel__company=company, is_active=True)
        else:
            return Lot.objects.none()

    def perform_destroy(self, instance):
        instance.is_active = False

        inferences = instance.inferencejob_set.filter(is_active=True)
        for inference in inferences:
            inference.is_active = False
            inference.save()

        instance.save()

    @action(detail=False, methods=["get"])
    def total(self, request):
        total = Lot.objects.filter(is_active=True).count()
        return Response({"total": total}, status=status.HTTP_200_OK)
