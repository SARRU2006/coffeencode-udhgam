import os
import zipfile

def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        # Filter directories to exclude
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'dist', 'build', '__pycache__', '.vscode', '.idea']]
        
        for file in files:
            if file == 'project_backup.zip' or file == 'zip_project.py':
                continue
            
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, start=path)
            print(f"Zipping: {arcname}")
            ziph.write(file_path, arcname)

if __name__ == '__main__':
    print("Starting backup...")
    try:
        with zipfile.ZipFile('project_backup.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
            zipdir('.', zipf)
        print("SUCCESS: Project zipped successfully into 'project_backup.zip'")
    except Exception as e:
        print(f"ERROR: Failed to zip project: {e}")
