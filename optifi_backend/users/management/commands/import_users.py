import csv
import os
from django.core.management.base import BaseCommand
from users.models import CustomUser
from django.conf import settings

class Command(BaseCommand):
    help = 'Import users from CSV'

    def handle(self, *args, **kwargs):
        with open(os.path.join(settings.BASE_DIR, 'datasets', 'users.csv')) as csvfile:
            reader = csv.DictReader(csvfile)

            for row in reader:
                user, created = CustomUser.objects.get_or_create(
                    email=row['email'],
                    defaults={
                        'username': row['username'],
                        'phone': row['phone'],
                        'profile_picture': row['profile_picture'],
                        'bio': row['bio'],
                        'is_premium': row['is_premium'] == 'True',
                        'monthly_income': int(row['monthly_income']),
                        'fixed_expenses': int(row['fixed_expenses']),
                        'savings_goal': row['savings_goal'],
                        'target_savings': int(row['target_savings']),
                        'preferred_budget_alert_limit': int(row['preferred_budget_alert_limit']),
                        'currency': row['currency'],
                    }
                )

                # Auto-set password for imported users
                if created:
                    user.set_password("test1234")
                    user.save()

                self.stdout.write(self.style.SUCCESS(f"Imported: {user.email}"))
