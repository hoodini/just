from cairosvg import svg2png

icon_svg = '''
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7300ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
</svg>
'''

sizes = [16, 32, 48, 128]

for size in sizes:
    svg2png(bytestring=icon_svg,
            write_to=f'icons/icon{size}.png',
            output_width=size,
            output_height=size) 