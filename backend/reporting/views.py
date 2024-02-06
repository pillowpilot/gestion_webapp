import weasyprint
from jinja2 import Environment, FileSystemLoader
from django.shortcuts import render
from publicapp.models import InferenceJob, Lot


def render_html(context: dict):
    templates_dir = "reporting/report_templates"
    template_filename = "inferences_fruits_leaves.html"

    env = Environment(loader=FileSystemLoader(templates_dir))
    template = env.get_template(template_filename)
    html = template.render(context)
    print(html)
    return html

def render_html_from_queryset(queryset):
    images = []
    for inference in queryset:
        # print(inference.image)
        # print(inference.image.path)
        parcel = Lot.objects.get(pk=inference.lot.id).parcel
        # print(parcel)
        images.append({
            'model': inference.model,
            'created_on': inference.created_on,
            'user': inference.user,
            'lot': inference.lot.name,
            'parcel': parcel,
            'coords': f'({inference.latitude}, {inference.longitude})',
            'path': f'file://{inference.image_thumbnail.path}',
        })

    # print(images)
    context = {
        'page_title_text': 'Inferencias',
        'title_text': 'Inferencias',
        'text': 'Listado de todas las inferencias',
        'images': images,
    }

    html = render_html(context)
    return html

def render_pdf_from_queryset(queryset):
    html = render_html_from_queryset(queryset)
    # print(html)
    pdf = weasyprint.HTML(string=html).write_pdf()
    return pdf

def temp_view():
    qs = InferenceJob.objects.all()
    pdf = render_pdf_from_queryset(qs)
    with open('test.pdf', 'wb') as f:
        f.write(pdf)
    