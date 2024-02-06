import re
from django.test import TestCase
from .views import render_html, render_pdf_from_queryset
from publicapp.models import InferenceJob


class InferencesReportTest(TestCase):
    def test_title_is_rendered(self):
        context = {
            'page_title_text': 'page_title_text'
        }
        html = render_html(context)
        self.assertTrue(html.find('page_title_text') > 0)

    def test_if_no_images_empty_report(self):
        context = {
            'images': [],
            'no_images_msg': 'No images found',
        }
        html = render_html(context)
        self.assertTrue(html.find('No images found') > 0)

    def test_render_image_data(self):
        context = {
            'images': [
                {
                    'model': 'image_model',
                    'created_on': 'created_on_date',
                    'user': 'test_user',
                    'coords': 'test_coords',
                },
            ],
        }
        html = render_html(context)
        self.assertTrue(html.find('image_model') > 0)
        self.assertTrue(html.find('created_on_date') > 0)
        self.assertTrue(html.find('test_user') > 0)
        self.assertTrue(html.find('test_coords') > 0)

    def test_render_default_values(self):
        # Notice that if the field is not present or if it is None, 
        # the default value will be rendered.
        context = {
            'images': [
                {
                    'model': None,
                    # 'created_on': 'created_on_date',
                    # 'user': 'XXXXXXXXX',
                    'coords': None,
                }
            ]
        }
        html = render_html(context)
        ii = [m.start() for m in re.finditer('Sin datos', html)]
        self.assertTrue(len(ii) >= 4)
