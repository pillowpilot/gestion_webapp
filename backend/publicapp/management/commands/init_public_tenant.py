from django.core.management.base import BaseCommand
from publicapp.models import Company, CompanyDomain


class Command(BaseCommand):
    help = "Initialize local domain and tenant for public schema"

    def handle(self, *args, **kwargs):
        public_tenant = Company.objects.filter(schema_name="public")
        if public_tenant.exists():
            self.stdout.write(
                self.style.SUCCESS("Public schema already initialized")
            )
            return None
        
        self.stdout.write(self.style.SUCCESS("Initializing public schema"))
        
        public_tenant = Company.objects.create(
            schema_name="public", name="public_schema"
        )
        public_tenant.save()

        public_domain = CompanyDomain.objects.create(
            company=public_tenant, domain="localhost"
        )
        public_domain.save()

        self.stdout.write(self.style.SUCCESS("Public schema initialized"))
        return None