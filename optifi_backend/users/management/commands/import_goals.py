import csv
import os
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
from goals.models import SavingGoal
from users.models import CustomUser
from datetime import datetime


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
                # Validate user
                try:
                    user = CustomUser.objects.get(id=row['user'])
                except CustomUser.DoesNotExist:
                    self.stdout.write(self.style.WARNING(
                        f"Skipping goal row {row.get('id')} - User {row['user']} does not exist"
                    ))
                    continue

                # Convert fields
                target_amount = float(row['target_amount']) if row['target_amount'] else 0
                saved_amount = float(row['saved_amount']) if row['saved_amount'] else 0

                start_date = parse_date(row['start_date']) if row['start_date'] else None
                end_date = parse_date(row['end_date']) if row['end_date'] else None

                completed = str(row['completed']).lower() == 'true'

                # AUTO-ADD created_at
                csv_created_at = row.get("created_at")
                created_at_value = None
                if csv_created_at:
                    try:
                        created_at_value = datetime.fromisoformat(csv_created_at)
                    except:
                        created_at_value = None

                # Step 1: Create record (Django auto assigns ID)
                goal = SavingGoal.objects.create(
                    user=user,
                    title=row['title'],
                    target_amount=target_amount,
                    saved_amount=saved_amount,
                    start_date=start_date,
                    end_date=end_date,
                    completed=completed
                )

                # Step 2: Manually set created_at (if provided)
                if created_at_value:
                    goal.created_at = created_at_value
                    goal.save(update_fields=["created_at"])

                self.stdout.write(self.style.SUCCESS(
                    f"Imported goal: {row['title']} for User {row['user']}"
                ))
