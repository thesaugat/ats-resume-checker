"""
Utility script for managing and querying saved resume analysis files
Run this script directly: python file_utils.py
"""

import json
import os
from datetime import datetime
from file_storage import (
    PROCESSED_FOLDER,
    list_all_analyses,
    search_by_name,
    get_total_scans,
    load_analysis,
)


def view_recent_scans(limit=10):
    """View recent resume scans"""
    analyses = list_all_analyses(limit=limit)

    print(f"\n{'='*80}")
    print(f"RECENT {limit} SCANS")
    print(f"{'='*80}\n")

    if not analyses:
        print("No scans found.")
        return

    for analysis in analyses:
        print(f"ID: {analysis['id']}")
        print(f"Name: {analysis.get('name', 'Unknown')}")
        print(f"Date: {analysis['date_time']}")
        print(f"IP: {analysis.get('ip_address', 'N/A')}")

        # Show a preview of the response
        response = analysis.get("response", {})
        response_preview = json.dumps(response, indent=2)[:200]
        print(f"Response Preview: {response_preview}...")
        print(f"{'-'*80}\n")


def get_stats():
    """Get file storage statistics"""
    total_scans = get_total_scans()

    if not os.path.exists(PROCESSED_FOLDER):
        print("Processed folder does not exist yet.")
        return

    # Count JSON files (excluding counter file)
    json_files = [
        f
        for f in os.listdir(PROCESSED_FOLDER)
        if f.endswith(".json") and not f.startswith("_")
    ]
    total_files = len(json_files)

    # Calculate folder size
    folder_size = 0
    for filename in json_files:
        filepath = os.path.join(PROCESSED_FOLDER, filename)
        folder_size += os.path.getsize(filepath)

    folder_size_mb = folder_size / (1024 * 1024)

    print(f"\n{'='*80}")
    print("FILE STORAGE STATISTICS")
    print(f"{'='*80}")
    print(f"Total Scans: {total_scans}")
    print(f"Total Files: {total_files}")
    print(f"Storage Used: {folder_size_mb:.2f} MB")
    print(f"Folder Location: {os.path.abspath(PROCESSED_FOLDER)}")
    print(f"{'='*80}\n")


def search_analyses(name: str):
    """Search analyses by candidate name"""
    analyses = search_by_name(name)

    print(f"\n{'='*80}")
    print(f"SEARCH RESULTS FOR: {name}")
    print(f"{'='*80}\n")
    print(f"Found {len(analyses)} results\n")

    if not analyses:
        print("No matching analyses found.")
        return

    for analysis in analyses:
        print(
            f"ID: {analysis['id']} | Name: {analysis.get('name', 'Unknown')} | Date: {analysis['date_time']}"
        )
    print()


def view_specific_analysis(unique_id: str):
    """View a specific analysis in detail"""
    analysis = load_analysis(unique_id)

    if not analysis:
        print(f"Analysis with ID '{unique_id}' not found.")
        return

    print(f"\n{'='*80}")
    print(f"ANALYSIS DETAILS: {unique_id}")
    print(f"{'='*80}\n")

    print(json.dumps(analysis, indent=2))
    print()


def export_all_to_single_file(output_file="all_analyses.json"):
    """Export all analyses to a single JSON file"""
    analyses = list_all_analyses()

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(analyses, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Exported {len(analyses)} analyses to {output_file}")


def cleanup_old_files(days_to_keep=30):
    """Delete files older than specified days (use with caution!)"""
    if not os.path.exists(PROCESSED_FOLDER):
        print("Processed folder does not exist.")
        return

    from datetime import timedelta

    cutoff_date = datetime.utcnow() - timedelta(days=days_to_keep)

    deleted_count = 0
    for filename in os.listdir(PROCESSED_FOLDER):
        if filename.endswith(".json") and not filename.startswith("_"):
            filepath = os.path.join(PROCESSED_FOLDER, filename)

            # Load and check date
            with open(filepath, "r") as f:
                data = json.load(f)
                file_date = datetime.fromisoformat(data["date_time"])

                if file_date < cutoff_date:
                    os.remove(filepath)
                    deleted_count += 1
                    print(f"Deleted: {filename}")

    print(f"\n✓ Deleted {deleted_count} files older than {days_to_keep} days")


if __name__ == "__main__":
    print("\n" + "=" * 80)
    print("RESUME SCANNER FILE UTILITIES")
    print("=" * 80)

    # Get stats
    get_stats()

    # View recent scans
    view_recent_scans(limit=5)

    # Uncomment to use other functions:
    # search_analyses("John")
    # view_specific_analysis("20241015_123456_abc12345")
    # export_all_to_single_file("backup.json")
    # cleanup_old_files(days_to_keep=90)
