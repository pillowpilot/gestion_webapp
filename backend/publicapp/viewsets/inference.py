from rest_framework import status, viewsets
from rest_framework.response import Response
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
            return InferenceJob.objects.filter(lot__parcel__company=company)
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
            result = inference_task.apply_async(task_id=task_id) # Task requires data from DB!
        except inference_task.OperationalError:
            inference.status = "failed"
            inference.save()
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return original_response
