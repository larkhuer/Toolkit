+ fixdex.py

	__tool to fix dex header__

	Usage: fixdex.py {.dex filename}
	generate "1_classes.dex" file as patched file after run this script.

+ hook_classes.js

	hook all method of specify class, or query like "com.android*!*"
	
	Usage: frida -U -f [package] -l hook_classes.js --no-pause
