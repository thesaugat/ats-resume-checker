import json
import os
from datetime import datetime
from pathlib import Path
import uuid

PROCESSED_FOLDER = "processed"


def init_storage():
    """Create processed folder if it doesn't exist"""
    Path(PROCESSED_FOLDER).mkdir(exist_ok=True)


def save_analysis(response_json: dict, name: str = None, ip: str = None):
    """Save analysis to JSON file and return unique ID"""
    init_storage()

    # Generate unique ID
    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    unique_id = f"{timestamp}_{str(uuid.uuid4())[:8]}"

    # Prepare data
    data = {
        "id": unique_id,
        "name": name or "Unknown",
        "ip": ip or "unknowm",
        "datetime": datetime.utcnow().isoformat(),
        "response_json": response_json,
    }

    # Save to file
    filepath = os.path.join(PROCESSED_FOLDER, f"{unique_id}.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    return unique_id


def get_total_scans():
    """Count total JSON files in processed folder"""
    if not os.path.exists(PROCESSED_FOLDER):
        return 0

    json_files = [f for f in os.listdir(PROCESSED_FOLDER) if f.endswith(".json")]
    return len(json_files)
