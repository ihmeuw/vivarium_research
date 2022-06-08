import sys, binascii

hex_file = sys.argv[1]
binary_file_name = sys.argv[2]

with open(hex_file, 'r') as f:
    hex_str = f.read()

if hex_str[-1] == '\n':
    hex_str = hex_str[:-1]

with open(binary_file_name, 'wb') as fout:
    fout.write(binascii.unhexlify(hex_str))
