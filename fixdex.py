#coding UTF-8
import sys
import zlib
import hashlib
import binascii as ba


	
def fix():
	try:
		sapk = open(sys.argv[1],"rb")
		dapk = open("1_classes.dex","wb")
	except:
		print("Usage: fixdex.py {.dex filename}")
		return -1

	sapk.seek(0)	
	w_open = sapk.read(8)

	sapk.seek(0)	
	w_filesize = len(sapk.read()).to_bytes(length=4, byteorder='little')

	sapk.seek(36)
	w_other = sapk.read()

	buf1 = w_filesize + w_other 
	w_signature = ba.a2b_hex(hashlib.sha1(buf1).hexdigest())

	buf2 = w_signature + buf1
	w_checksum = zlib.adler32(buf2).to_bytes(length=4, byteorder='little')

	dapk.write(w_open)
	dapk.write(w_checksum)
	dapk.write(w_signature)
	dapk.write(w_filesize)
	dapk.write(w_other)
	dapk.close()
	sapk.close()


	print("[+] magic \t\t%s" % w_open.decode().replace('\n',' '))
	print("[+] checksum \t\t%s" % hex(int.from_bytes(w_checksum, byteorder='little')))
	print("[+] signature \t\t%s" % ba.b2a_hex(w_signature).decode())
	print("[+] filesize \t\t%u bytes" % int.from_bytes(w_filesize, byteorder='little'))

	return 0

if __name__ == "__main__":
	fix()
