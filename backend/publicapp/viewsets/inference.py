from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from celery import uuid
from ..tasks import inference_task
from ..models import InferenceJob
from ..serializers import InferenceJobSerializer
from ..permissions import CustomDjangoModelPermissions


class InferenceViewSet(viewsets.ModelViewSet):
    serializer_class = InferenceJobSerializer
    permission_classes = [CustomDjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user
        company = user.company
        if company:
            return InferenceJob.objects.filter(
                lot__parcel__company=company, is_active=True
            )
        else:
            return InferenceJob.objects.none()

    def perform_create(self, serializer):
        original_response = super().perform_create(serializer)
        inference = serializer.instance

        task_id = uuid()

        inference.status = "pending"
        inference.task_id = task_id
        inference.user = self.request.user
        inference.save()

        try:
            result = inference_task.apply_async(
                task_id=task_id
            )  # Task requires data from DB!
        except inference_task.OperationalError:
            inference.status = "failed"
            inference.save()
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return original_response

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    @action(detail=False, methods=["get"])
    def total(self, request):
        total = InferenceJob.objects.filter(is_active=True).count()
        return Response({"total": total}, status=status.HTTP_200_OK)
