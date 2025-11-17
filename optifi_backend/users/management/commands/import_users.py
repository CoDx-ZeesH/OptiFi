import csv
from django.core.management.base import BaseCommand
from users.models import CustomUser
from django.utils.dateparse import parse_date
from django.contrib.auth.hashers import make_password
import os

class Command(BaseCommand):
    help = "Import users from users.csv"

    def add_arguments(self, parser):
        parser.add_argument(
            '--file',
            type=str,
            default=os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../datasets/users.csv'),
            help='Path to users CSV file'
        )

    def handle(self, *args, **options):
        file_path = options['file']

        try:
            with open(file_path, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)

                for row in reader:

                    # Avoid duplicate users
                    if CustomUser.objects.filter(email=row['email']).exists():
                        self.stdout.write(self.style.WARNING(
                            f"User with email {row['email']} already exists. Skipped."
                        ))
                        continue

                    user = CustomUser(
                        username=row['username'],
                        email=row['email'],
                        balance=row['balance'],
                        total_savings=row['total_savings'],
                        target_savings=row['target_savings'],

                        monthly_income=row['monthly_income'],
                        monthly_expenses=row['monthly_expenses'],
                        monthly_savings=row['monthly_savings'],
                        today_spent=row['today_spent'],

                        profile_picture=row['profile_picture'] or None,
                        date_of_birth=parse_date(row['date_of_birth']) if row['date_of_birth'] else None,
                        gender=row['gender'],
                        nationality=row['nationality'],
                        address=row['address'],
                        member_since=parse_date(row['member_since']),

                        ai_nudges=row['ai_nudges'].lower() == 'true',
                        email_reports=row['email_reports'].lower() == 'true',
                        ocr_receipts_sync=row['ocr_receipts_sync'].lower() == 'true',

                        insights_frequency=row['insights_frequency'],
                        currency=row['currency'],
                        theme=row['theme'],
                        two_factor_auth=row['two_factor_auth'].lower() == 'true',

                        password=make_password("test1234")  # default password
                    )

                    user.save()

                    self.stdout.write(self.style.SUCCESS(
                        f"Imported user: {row['username']}"
                    ))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
