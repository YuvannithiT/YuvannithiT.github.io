import os

directory_path = r'D:\YuvannithiT.github.io\css'
os.chdir(directory_path)

css_files = [
    'variables.css',
    'layout.css',
    'fonts.css',
    'typography.css',
    'header.css',
    'navigation.css',
    'theme-toggle.css',
    'components.css',
    'footer.css',
    'contact-icons.css',
    'responsive-styles.css'
]

output_directory = directory_path
output_file = os.path.join(output_directory, 'full-version.css')

with open(output_file, 'w') as outfile:
    for file in css_files:
        try:
            with open(file) as infile:
                outfile.write(f"/* Contents of {file} */\n")
                outfile.write(infile.read())
                outfile.write("\n\n")
        except FileNotFoundError:
            print(f"Error: {file} not found.\n\n")