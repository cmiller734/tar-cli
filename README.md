#### Tar Batcher for Updated SVG App

This command line utility can be run by switching into a directory and running "tar-cli [flags]".

The utility is designed to run on either a single directory ("tar-cli") or all subdirectories in a dir ("tar-cli -m" (for multi)).
When run, it creates either a .tar file of the files in the folder or a folder with /tar files of all the folder's subfolders (if "tar-cli -m" is called).

Users can specify file extensions to include in the .tar files. If a user types "tar-cli .svg", the .tar files 
that are created will contain only the .svg files in that directory. If a user types "tar-cli -m -e .svg", the .tar files
that are created will contain only the .svg files from subdirs of that directory.

Installation: `npm install -S tar-cli`