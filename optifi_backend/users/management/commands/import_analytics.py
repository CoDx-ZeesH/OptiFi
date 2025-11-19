import csv
import os
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
from users.models import CustomUser
from analytics.models import MonthlyAnalytics, WeeklyAnalytics, CategoryAnalytics


class Command(BaseCommand):
    help = "Import analytics data from datasets/analytics.csv"

    def handle(self, *args, **kwargs):

        # Path: analytics/management/commands → go 3 folders up → datasets/analytics.csv
        file_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)),
            '../../../datasets/analytics.csv'
        )

        file_path = os.path.normpath(file_path)

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f"❌ File not found: {file_path}"))
            return

        self.stdout.write(self.style.WARNING(f"📄 Loading analytics from: {file_path}"))

        monthly_cache = {}  # prevent duplicate monthly inserts

        with open(file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)

            for row in reader:
                user_id = row['user']

                # Validate user
                try:
                    user = CustomUser.objects.get(id=user_id)
                except CustomUser.DoesNotExist:
                    self.stdout.write(self.style.WARNING(
                        f"⚠ Skipping row — User {user_id} does not exist."
                    ))
                    continue

                month = row["month"]
                income = int(row["income"])
                expenses = int(row["expenses"])
                insight = row["ai_insight"]

                # -----------------------------------------
                # 1️⃣ MONTHLY ANALYTICS
                # -----------------------------------------
                key = (user.id, month)
                if key not in monthly_cache:
                    monthly_obj = MonthlyAnalytics.objects.create(
                        user=user,
                        month=month,
                        total_income=income,
                        total_expenses=expenses,
                        ai_insight=insight,
                    )
                    monthly_cache[key] = monthly_obj

                month_record = monthly_cache[key]

                # -----------------------------------------
                # 2️⃣ WEEKLY ANALYTICS
                # -----------------------------------------
                if row["week"]:
                    WeeklyAnalytics.objects.create(
                        user=user,
                        month_record=month_record,
                        week=row["week"],
                        weekly_value=int(row["weekly_value"])
                    )

                # -----------------------------------------
                # 3️⃣ CATEGORY ANALYTICS
                # -----------------------------------------
                if row["category"]:
                    CategoryAnalytics.objects.create(
                        user=user,
                        month_record=month_record,
                        category=row["category"],
                        amount=int(row["category_value"])
                    )

        self.stdout.write(self.style.SUCCESS("✅ Analytics data imported successfully!"))
