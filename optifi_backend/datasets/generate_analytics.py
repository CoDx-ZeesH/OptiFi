import csv
import os
import random

# Get absolute path to datasets folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATASET_PATH = os.path.join(BASE_DIR, "datasets", "analytics.csv")

# Ensure datasets folder exists
os.makedirs(os.path.dirname(DATASET_PATH), exist_ok=True)

users = range(1, 26)
months = [
    ("2025-06", "You're overspending on Food this month."),
    ("2025-07", "Travel costs increased by 12% this month."),
    ("2025-08", "Bills are unusually high this month."),
    ("2025-09", "Entertainment spending increased 18%."),
    ("2025-10", "Travel spending is stable."),
    ("2025-11", "Good job! Your spending is controlled."),
]

weeks = ["W1", "W2", "W3", "W4"]
categories = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Misc"]

print("Writing analytics.csv to:", DATASET_PATH)

with open(DATASET_PATH, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow([
        "user", "month", "income", "expenses",
        "week", "weekly_value",
        "category", "category_value",
        "ai_insight"
    ])

    for user in users:
        for month, insight in months:

            income = random.randint(42000, 52000)
            expenses = random.randint(18000, 26000)

            # Weekly rows
            for w in weeks:
                writer.writerow([
                    user, month, income, expenses,
                    w, random.randint(4000, 7000),
                    "", "", insight
                ])

            # Category rows
            for c in categories:
                writer.writerow([
                    user, month, income, expenses,
                    "", "",
                    c, random.randint(800, 8000),
                    insight
                ])

print("DONE! analytics.csv generated successfully.")
