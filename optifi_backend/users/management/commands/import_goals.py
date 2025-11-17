import csv
import os
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
from goals.models import SavingGoal
from users.models import CustomUser


class Command(BaseCommand):
    help = "Import saving goals from goals.csv"

    def handle(self, *args, **kwargs):

        # Path: goals/management/commands → go 3 folders up → datasets/goals.csv
        file_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            '../../../datasets/goals.csv'
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
                        f"Skipping goal {row['id']} - User {row['user']} does not exist"
                    ))
                    continue

                SavingGoal.objects.create(
                    id=row['id'],
                    user=user,
                    title=row['title'],
                    target_amount=row['target_amount'],
                    saved_amount=row['saved_amount'],
                    start_date=parse_date(row['start_date']),
                    end_date=parse_date(row['end_date']),
                    completed=row['completed'].lower() == 'true',
                    created_at=parse_date(row['created_at'])
                )

                self.stdout.write(self.style.SUCCESS(
                    f"Imported goal: {row['title']} for User {row['user']}"
                ))
