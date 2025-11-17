import csv
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
from transactions.models import Transaction
from users.models import CustomUser
import os

class Command(BaseCommand):
    help = "Import transactions from transactions.csv"

    def add_arguments(self, parser):
        parser.add_argument(
            '--file',
            type=str,
            default=os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../datasets/transactions.csv'),
            help='Path to transactions CSV file'
        )

    def handle(self, *args, **options):
        file_path = options['file']

        try:
            with open(file_path, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)

                for row in reader:
                    try:
                        user = CustomUser.objects.get(id=row['user'])
                    except CustomUser.DoesNotExist:
                        self.stdout.write(self.style.ERROR(
                            f"Skipping row {row['id']} — User {row['user']} not found."
                        ))
                        continue

                    Transaction.objects.create(
                        id=row["id"],
                        user=user,
                        date=parse_date(row["date"]),
                        description=row["description"],
                        amount=row["amount"],
                        type=row["type"],
                        category=row["category"],
                        source=row["source"],
                        created_at=parse_date(row["created_at"])
                    )

                    self.stdout.write(self.style.SUCCESS(
                        f"Imported transaction ID {row['id']} for user {row['user']}"
                    ))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
