from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def tenant_index(request):
    return HttpResponse(f'<h1>{request.tenant}</h1>')