from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

def public_index(request):
    return HttpResponse("<h1>Public index 2</h1>")

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def whoiam(request):
    """
    Returns the user's information
    """
    user = request.user
    company = user.company
    body = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "is_company_manager": user.is_company_manager,
        "company": {
            "id": company.id,
            "name": company.name,
        },
    }
    return Response(body, status=status.HTTP_200_OK)
