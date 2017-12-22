import os
import sys

path = sys.argv[1]

file_extensions = [".js"]

for root, dirs, files in os.walk(path):                                                                   #walking on video_path
	for file in files: 
                if not file.startswith('.') and os.path.splitext(file)[1].lower() in file_extensions:
			sys.stdout.write(os.path.join(root, file))
			sys.stdout.write("\n")
