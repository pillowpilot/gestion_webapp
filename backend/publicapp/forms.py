from django import forms
from .models import Image

class ImageForm(forms.ModelForm):
    """Form for the image model"""
    class Meta:
        model = Image
        fields = ('title', 'image')
        widgets = {
            'title': forms.TextInput(attrs={
                'class': "form-control",
                'placeholder': 'Title'
                }),
            'image': forms.FileInput(attrs={
                'class': "form-control",
                'placeholder': 'Image'
                }),
        }