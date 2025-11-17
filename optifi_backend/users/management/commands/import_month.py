import csv
import os
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
from users.models import CustomUser
from analytics.models import MonthlySummary


class Command(BaseCommand):
    help = "Import monthly financial summaries"

    def handle(self, *args, **kwargs):

        file_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            '../../../datasets/monthly_summary.csv'
        )

        file_path = os.path.normpath(file_path)

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
            return

        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)

            for row in reader:

                try:
                    user = CustomUser.objects.get(id=row['user'])
                except CustomUser.DoesNotExist:
                    self.stdout.write(self.style.WARNING(
                        f"Skipping user {row['user']} — not found"))
                    continue

                MonthlySummary.objects.create(
                    user=user,
                    month=parse_date(row['month']),
                    income=row['income'],
                    expenses=row['expenses'],
                    savings=row['savings'],
                )

                self.stdout.write(self.style.SUCCESS(
                    f"Imported {row['month']} for user {row['user']}"
                ))
