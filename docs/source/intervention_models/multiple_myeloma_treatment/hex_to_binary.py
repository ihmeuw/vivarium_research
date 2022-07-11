import sys, binascii

for setting in ('ndmm', 'rrmm'):
    for model_type in ('', '_naive'):
        hex_file_name = f'{setting}_model{model_type}.hex'
        binary_file_name = f'{setting}_model{model_type}.pkl'

        with open(hex_file_name, 'r') as f:
            hex_str = f.read()

        if hex_str[-1] == '\n':
            hex_str = hex_str[:-1]

        with open(binary_file_name, 'wb') as fout:
            fout.write(binascii.unhexlify(hex_str))
