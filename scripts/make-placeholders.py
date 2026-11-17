#!/usr/bin/env python3
"""Erzeugt die Platzhalter-Illustrationen als SVG (Markenfarben von Oh Paw Studio).

Aufruf:  python3 scripts/make-placeholders.py <ausgabeordner>
Danach die SVGs z. B. mit Chrome (headless) zu JPG rendern, siehe docs/bilder-einfuegen.md.
Die Bilder sind bewusst schlichte Platzhalter, bis echte Fotos vorliegen.
"""
import os
import sys

IVORY, SAND, SAGE, OLIVE, COCOA, TAUPE = "#f5f1e9", "#e5dccf", "#a7ad98", "#747b67", "#443c35", "#b7a99a"
BLUSH, CREAM, SAGE_L, SAND_L = "#e3b9a8", "#efe4d1", "#cfd3c4", "#efe7da"
FUR = {"dark": ("#5b4f45", "#6d6054"), "cream": ("#e8d9bf", "#f3ead9"), "grey": ("#8f9684", "#a7ad98"), "ginger": ("#d29a6a", "#e6b88c")}


def cat_sitting(x, y, s=1.0, fur="dark", tail=True, flip=False):
    body, light = FUR[fur]
    f = -1 if flip else 1
    t = f'<path d="M50,-12 C135,-6 150,-90 112,-128" fill="none" stroke="{body}" stroke-width="26" stroke-linecap="round"/>' if tail else ""
    return f'''<g transform="translate({x},{y}) scale({s*f},{s})">
  {t}
  <path d="M-62,0 C-74,-92 -48,-152 0,-152 C48,-152 74,-92 62,0 Z" fill="{body}"/>
  <ellipse cx="0" cy="-62" rx="30" ry="58" fill="{light}" opacity=".55"/>
  <ellipse cx="-24" cy="-4" rx="19" ry="10" fill="{light}"/><ellipse cx="24" cy="-4" rx="19" ry="10" fill="{light}"/>
  <polygon points="-50,-204 -44,-268 -6,-232" fill="{body}"/><polygon points="50,-204 44,-268 6,-232" fill="{body}"/>
  <polygon points="-41,-212 -38,-250 -17,-229" fill="{BLUSH}" opacity=".85"/><polygon points="41,-212 38,-250 17,-229" fill="{BLUSH}" opacity=".85"/>
  <circle cx="0" cy="-186" r="54" fill="{body}"/>
  <ellipse cx="0" cy="-170" rx="30" ry="22" fill="{light}" opacity=".5"/>
  <path d="M-30,-192 q9,9 18,0 M12,-192 q9,9 18,0" fill="none" stroke="{COCOA}" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M-6,-176 h12 l-6,7 z" fill="{BLUSH}"/>
  <path d="M0,-169 v4 M0,-165 q-7,7 -13,2 M0,-165 q7,7 13,2" fill="none" stroke="{COCOA}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M-62,-172 l-30,-5 M-62,-163 l-30,5 M62,-172 l30,-5 M62,-163 l30,5" stroke="{COCOA}" stroke-width="2" opacity=".4" stroke-linecap="round"/>
</g>'''


def cat_loaf(x, y, s=1.0, fur="cream"):
    body, light = FUR[fur]
    return f'''<g transform="translate({x},{y}) scale({s})">
  <path d="M-115,0 C-125,-85 -80,-125 10,-125 C100,-125 135,-80 125,0 Z" fill="{body}"/>
  <path d="M100,-6 C150,-8 165,-50 150,-86" fill="none" stroke="{body}" stroke-width="22" stroke-linecap="round"/>
  <ellipse cx="-62" cy="-6" rx="30" ry="12" fill="{light}"/>
  <polygon points="-124,-138 -116,-192 -84,-158" fill="{body}"/><polygon points="-36,-142 -52,-194 -80,-158" fill="{body}"/>
  <polygon points="-117,-146 -113,-178 -96,-160" fill="{BLUSH}" opacity=".85"/><polygon points="-45,-148 -53,-178 -68,-161" fill="{BLUSH}" opacity=".85"/>
  <circle cx="-80" cy="-108" r="50" fill="{body}"/>
  <ellipse cx="-80" cy="-92" rx="28" ry="20" fill="{light}" opacity=".6"/>
  <path d="M-108,-112 q9,9 18,0 M-70,-112 q9,9 18,0" fill="none" stroke="{COCOA}" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M-86,-96 h12 l-6,7 z" fill="{BLUSH}"/>
</g>'''


def cat_curled(x, y, s=1.0, fur="grey"):
    body, light = FUR[fur]
    return f'''<g transform="translate({x},{y}) scale({s})">
  <ellipse cx="0" cy="-84" rx="128" ry="86" fill="{body}"/>
  <path d="M-110,-30 C-60,24 70,26 120,-24" fill="none" stroke="{light}" stroke-width="26" stroke-linecap="round"/>
  <polygon points="-128,-102 -122,-156 -92,-124" fill="{body}"/><polygon points="-52,-112 -64,-160 -92,-124" fill="{body}"/>
  <polygon points="-122,-110 -119,-142 -102,-124" fill="{BLUSH}" opacity=".85"/>
  <circle cx="-86" cy="-84" r="46" fill="{light}"/>
  <path d="M-110,-86 q8,8 16,0 M-78,-86 q8,8 16,0" fill="none" stroke="{COCOA}" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M-92,-72 h10 l-5,6 z" fill="{BLUSH}"/>
</g>'''


def cat_peek(x, y, s=1.0, fur="dark", look_up=True):
    body, light = FUR[fur]
    eye = '<circle cx="-24" cy="-62" r="11" fill="%s"/><circle cx="24" cy="-62" r="11" fill="%s"/><circle cx="-21" cy="-66" r="3.5" fill="#fff"/><circle cx="27" cy="-66" r="3.5" fill="#fff"/>' % (COCOA, COCOA)
    return f'''<g transform="translate({x},{y}) scale({s})">
  <polygon points="-58,-92 -50,-150 -12,-110" fill="{body}"/><polygon points="58,-92 50,-150 12,-110" fill="{body}"/>
  <polygon points="-48,-100 -45,-134 -24,-112" fill="{BLUSH}" opacity=".85"/><polygon points="48,-100 45,-134 24,-112" fill="{BLUSH}" opacity=".85"/>
  <circle cx="0" cy="-48" r="64" fill="{body}"/>
  <ellipse cx="0" cy="-30" rx="34" ry="24" fill="{light}" opacity=".55"/>
  {eye}
  <path d="M-6,-44 h12 l-6,7 z" fill="{BLUSH}"/>
  <path d="M-62,-46 l-32,-5 M-62,-36 l-32,5 M62,-46 l32,-5 M62,-36 l32,5" stroke="{COCOA}" stroke-width="2" opacity=".35" stroke-linecap="round"/>
  <ellipse cx="-44" cy="6" rx="22" ry="13" fill="{light}"/><ellipse cx="44" cy="6" rx="22" ry="13" fill="{light}"/>
</g>'''


def plant(x, y, s=1.0, pot=TAUPE):
    return f'''<g transform="translate({x},{y}) scale({s})">
  <g fill="{SAGE}"><ellipse cx="-34" cy="-118" rx="16" ry="52" transform="rotate(-28 -34 -118)"/><ellipse cx="34" cy="-122" rx="16" ry="54" transform="rotate(26 34 -122)"/></g>
  <g fill="{OLIVE}"><ellipse cx="0" cy="-138" rx="17" ry="60"/><ellipse cx="-64" cy="-86" rx="14" ry="42" transform="rotate(-58 -64 -86)"/><ellipse cx="64" cy="-90" rx="14" ry="42" transform="rotate(56 64 -90)"/></g>
  <path d="M-46,-62 h92 l-12,62 h-68 z" fill="{pot}"/><rect x="-52" y="-72" width="104" height="16" rx="6" fill="{pot}"/>
  <rect x="-52" y="-72" width="104" height="6" rx="3" fill="#fff" opacity=".18"/>
</g>'''


def book(x, y, w, h, color, spine=None, rot=0):
    sp = spine or COCOA
    return f'''<g transform="translate({x},{y}) rotate({rot})"><rect x="0" y="{-h}" width="{w}" height="{h}" rx="6" fill="{color}"/>
  <rect x="0" y="{-h}" width="{w}" height="{h}" rx="6" fill="none" stroke="{sp}" stroke-opacity=".25" stroke-width="2"/>
  <rect x="{w*0.08}" y="{-h*0.62}" width="{w*0.84}" height="5" rx="2.5" fill="{sp}" opacity=".35"/>
  <rect x="{w*0.08}" y="{-h*0.4}" width="{w*0.5}" height="5" rx="2.5" fill="{sp}" opacity=".25"/></g>'''


def paw(x, y, s=1.0, color=TAUPE, op=0.55, rot=0):
    return f'''<g transform="translate({x},{y}) rotate({rot}) scale({s})" fill="{color}" opacity="{op}">
  <ellipse cx="0" cy="14" rx="19" ry="16"/><ellipse cx="-24" cy="-12" rx="8.5" ry="11"/><ellipse cx="-8" cy="-26" rx="8.5" ry="11.5"/>
  <ellipse cx="9" cy="-26" rx="8.5" ry="11.5"/><ellipse cx="25" cy="-12" rx="8.5" ry="11"/></g>'''


def heart(x, y, s=1.0, color=BLUSH, op=1):
    return f'<g transform="translate({x},{y}) scale({s})" opacity="{op}"><path d="M0,10 C-30,-12 -18,-34 0,-20 C18,-34 30,-12 0,10 Z" fill="{color}"/></g>'


def sparkle(x, y, s=1.0, color=SAGE):
    return f'<g transform="translate({x},{y}) scale({s})"><path d="M0,-18 Q2,-2 18,0 Q2,2 0,18 Q-2,2 -18,0 Q-2,-2 0,-18Z" fill="{color}"/></g>'


def mug(x, y, s=1.0, color=SAGE_L):
    return f'''<g transform="translate({x},{y}) scale({s})"><rect x="-36" y="-62" width="72" height="62" rx="12" fill="{color}"/>
  <path d="M34,-48 q30,2 24,24 q-4,14 -26,12" fill="none" stroke="{color}" stroke-width="10" stroke-linecap="round"/>
  <path d="M-12,-84 q-8,-12 0,-22 M6,-84 q-8,-12 0,-22" fill="none" stroke="{TAUPE}" stroke-width="4" stroke-linecap="round" opacity=".6"/></g>'''


def ball(x, y, r, color=BLUSH):
    return f'<g><circle cx="{x}" cy="{y}" r="{r}" fill="{color}"/><path d="M{x-r*0.7},{y-r*0.3} q{r*0.7},{r*0.9} {r*1.4},0" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3"/></g>'


def svg(w, h, vb, body, defs=""):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="{vb}"><defs>{defs}</defs>{body}</svg>'


def grad(id_, a, b, vertical=True):
    d = 'x1="0" y1="0" x2="0" y2="1"' if vertical else 'x1="0" y1="0" x2="1" y2="1"'
    return f'<linearGradient id="{id_}" {d}><stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>'


def scene_hero():
    # Hochformat 4:5, 1200 x 1500: Katze am Fenster
    b = f'''<rect x="-200" y="-200" width="1600" height="1900" fill="url(#bg)"/>
<path d="M260,1130 V520 C260,330 400,230 600,230 C800,230 940,330 940,520 V1130 Z" fill="url(#win)"/>
<circle cx="740" cy="470" r="86" fill="#f7ecd2" opacity=".9"/><circle cx="740" cy="470" r="130" fill="#f7ecd2" opacity=".35"/>
<path d="M260,1130 V520 C260,330 400,230 600,230 C800,230 940,330 940,520 V1130" fill="none" stroke="{TAUPE}" stroke-width="22"/>
<path d="M600,230 V1130 M260,700 H940" stroke="{TAUPE}" stroke-width="12" opacity=".9"/>
{sparkle(420,420,1.2,"#fff")}{sparkle(840,640,0.9,"#fff")}
<rect x="200" y="1120" width="800" height="46" rx="10" fill="{TAUPE}"/><rect x="200" y="1120" width="800" height="12" rx="6" fill="#fff" opacity=".22"/>
<rect x="150" y="1166" width="900" height="400" fill="{SAND}"/>
{plant(350,1120,1.5)}{cat_sitting(690,1120,1.5,"dark")}
{paw(300,1330,1.3,TAUPE,.4,-14)}{paw(420,1390,1.3,TAUPE,.4,10)}{paw(900,1310,1.1,TAUPE,.35,16)}
{heart(930,300,1.0,BLUSH,.9)}'''
    d = grad("bg", IVORY, SAND_L) + grad("win", "#dfe4d6", "#f2ead8")
    return svg(1200, 1500, "0 0 1200 1500", b, d)


def scene_story():
    # 4:3, 1200 x 900: Buch, Tasse und schlafende Katze
    b = f'''<rect x="-200" y="-200" width="1600" height="1400" fill="url(#bg)"/>
<circle cx="920" cy="250" r="150" fill="{SAGE_L}" opacity=".7"/>
<rect x="-200" y="640" width="1600" height="500" fill="{SAND}"/><rect x="-200" y="640" width="1600" height="10" fill="#fff" opacity=".25"/>
<g transform="translate(300,640)"><path d="M0,0 L-30,-34 L270,-34 L300,0 Z" fill="{TAUPE}" opacity=".0"/></g>
<g transform="translate(130,640)">
  <path d="M0,-18 C70,-50 150,-42 220,-8 V30 C150,-4 70,-12 0,18 Z" fill="#fbf8f1"/><path d="M440,-18 C370,-50 290,-42 220,-8 V30 C290,-4 370,-12 440,18 Z" fill="#f3ece0"/>
  <path d="M0,18 C70,-12 150,-4 220,30 C290,-4 370,-12 440,18 L440,34 C370,6 290,14 220,48 C150,14 70,6 0,34 Z" fill="{OLIVE}" opacity=".9"/>
  <g fill="none" stroke="{TAUPE}" stroke-width="4" stroke-linecap="round" opacity=".7"><path d="M40,-6 q60,-22 140,6 M40,10 q60,-22 140,6 M260,12 q80,-28 140,-6 M260,-4 q80,-28 140,-6"/></g>
  {heart(220,-60,.8)}
</g>
{mug(650,640,1.3)}
{cat_curled(870,628,1.15,"ginger")}
{plant(1100,640,1.0,SAGE)}
{paw(130,760,1.2,TAUPE,.4,-12)}{paw(210,820,1.2,TAUPE,.35,12)}'''
    d = grad("bg", IVORY, SAND_L)
    return svg(1200, 900, "0 0 1200 900", b, d)


def scene_start(vb_y=0, h=900):
    # Der Start: Kitten schaut aus einem Karton
    b = f'''<rect x="-200" y="-200" width="1600" height="1400" fill="url(#bg)"/>
<circle cx="250" cy="260" r="120" fill="{SAGE_L}" opacity=".8"/>{sparkle(900,220,1.4,SAGE)}{sparkle(980,330,.8,BLUSH)}
<rect x="-200" y="680" width="1600" height="500" fill="{SAND}"/>
{cat_peek(600,520,1.9,"ginger")}
<path d="M360,520 H840 L820,780 H380 Z" fill="{TAUPE}"/><rect x="340" y="500" width="520" height="40" rx="8" fill="#c4b6a6"/>
<rect x="520" y="590" width="160" height="34" rx="17" fill="#fff" opacity=".35"/>
{ball(1010,745,38,BLUSH)}{paw(230,790,1.3,TAUPE,.45,-10)}{paw(310,850,1.3,TAUPE,.4,10)}{heart(950,420,1.1)}'''
    return svg(1200, h, f"0 {vb_y} 1200 {h}", b, grad("bg", IVORY, SAND_L))


def scene_care(vb_y=0, h=900):
    # Alltag & Pflege: Kalender mit Haken, Katze, Herz
    cells = ""
    for r in range(3):
        for c in range(5):
            x, y = 300 + c * 96, 330 + r * 90
            mark = f'<path d="M{x+16},{y+30} l12,13 l24,-28" fill="none" stroke="{OLIVE}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' if (r * 5 + c) in (0, 1, 2, 3, 5, 6, 8, 9) else ""
            cells += f'<rect x="{x}" y="{y}" width="72" height="66" rx="12" fill="{IVORY}"/>{mark}'
    b = f'''<rect x="-200" y="-200" width="1600" height="1400" fill="url(#bg)"/>
<circle cx="1000" cy="230" r="110" fill="{SAGE_L}" opacity=".8"/>
<rect x="-200" y="690" width="1600" height="500" fill="{SAND}"/>
<g><rect x="270" y="200" width="520" height="440" rx="26" fill="#fbf8f1" stroke="{TAUPE}" stroke-width="4"/><rect x="270" y="200" width="520" height="86" rx="26" fill="{OLIVE}"/><rect x="270" y="250" width="520" height="36" fill="{OLIVE}"/>
<rect x="370" y="168" width="22" height="62" rx="11" fill="{COCOA}"/><rect x="668" y="168" width="22" height="62" rx="11" fill="{COCOA}"/>{cells}</g>
{cat_sitting(930,700,1.3,"grey")}{heart(840,230,1.4)}{sparkle(200,300,1.2,SAGE)}{plant(130,700,1.0,TAUPE)}
{paw(480,790,1.2,TAUPE,.4,-8)}{paw(560,840,1.2,TAUPE,.35,12)}'''
    return svg(1200, h, f"0 {vb_y} 1200 {h}", b, grad("bg", IVORY, SAND_L))


def scene_home(vb_y=0, h=900):
    # Zuhause & Beschäftigung: Katze auf Regal, Pflanze, Fensterlicht
    b = f'''<rect x="-200" y="-200" width="1600" height="1400" fill="url(#bg)"/>
<path d="M120,690 V330 C120,230 200,170 280,170 C360,170 440,230 440,330 V690 Z" fill="url(#win)" stroke="{TAUPE}" stroke-width="14"/>
<path d="M280,170 V690 M120,430 H440" stroke="{TAUPE}" stroke-width="8"/>
<rect x="-200" y="720" width="1600" height="500" fill="{SAND}"/>
<rect x="560" y="360" width="560" height="26" rx="8" fill="{TAUPE}"/>
{book(600,360,46,120,SAGE)}{book(652,360,40,104,TAUPE,OLIVE)}{book(698,360,52,134,CREAM)}
{cat_loaf(930,360,1.1,"cream")}
<path d="M840,720 V470 M980,720 V470" stroke="{TAUPE}" stroke-width="16" stroke-linecap="round" opacity=".0"/>
{plant(640,720,1.5,SAGE)}{ball(840,696,26,BLUSH)}
{heart(540,470,.9,BLUSH,.9)}{paw(290,800,1.2,TAUPE,.4,-10)}{paw(370,850,1.2,TAUPE,.35,12)}'''
    d = grad("bg", IVORY, SAND_L) + grad("win", "#dfe4d6", "#f2ead8")
    return svg(1200, h, f"0 {vb_y} 1200 {h}", b, d)


def scene_memories(vb_y=0, h=900):
    # Erinnerungen: Polaroids, Buch, Katze
    def polaroid(x, y, rot, tone):
        return f'''<g transform="translate({x},{y}) rotate({rot})"><rect x="-96" y="-116" width="192" height="232" rx="6" fill="#fffdf8" stroke="{SAND}" stroke-width="3"/>
  <rect x="-80" y="-100" width="160" height="150" rx="4" fill="{tone}"/>{paw(0,-28,1.2,"#fff",.75)}<rect x="-60" y="74" width="80" height="8" rx="4" fill="{TAUPE}" opacity=".5"/></g>'''
    b = f'''<rect x="-200" y="-200" width="1600" height="1400" fill="url(#bg)"/>
<rect x="-200" y="700" width="1600" height="500" fill="{SAND}"/>
<path d="M170,150 C400,230 700,60 1000,170" fill="none" stroke="{TAUPE}" stroke-width="5" stroke-linecap="round"/>
<g transform="translate(0,0)">{polaroid(330,330,-7,SAGE_L)}{polaroid(600,300,3,"#ecd6c6")}{polaroid(870,335,8,"#dfe4d6")}</g>
<g fill="{OLIVE}"><rect x="318" y="150" width="26" height="14" rx="3" transform="rotate(-6 331 157)"/><rect x="588" y="124" width="26" height="14" rx="3"/><rect x="860" y="154" width="26" height="14" rx="3" transform="rotate(8 873 161)"/></g>
{book(250,730,420,64,OLIVE,IVORY,-1)}{book(270,666,380,56,SAND_L,COCOA,1)}
{cat_loaf(900,730,1.15,"dark")}{heart(1020,520,1.1)}{sparkle(140,520,1.2,SAGE)}'''
    return svg(1200, h, f"0 {vb_y} 1200 {h}", b, grad("bg", IVORY, SAND_L))


def scene_enrichment(vb_y=0, h=900):
    # Beschäftigung: Katze jagt Federspielzeug
    b = f'''<rect x="-200" y="-200" width="1600" height="1400" fill="url(#bg)"/>
<circle cx="900" cy="250" r="130" fill="{SAGE_L}" opacity=".8"/>
<rect x="-200" y="700" width="1600" height="500" fill="{SAND}"/>
<path d="M300,160 C420,300 520,260 640,420" fill="none" stroke="{TAUPE}" stroke-width="5" stroke-linecap="round"/>
<g transform="translate(640,420) rotate(20)"><ellipse cx="0" cy="28" rx="14" ry="42" fill="{BLUSH}"/><ellipse cx="-24" cy="26" rx="12" ry="36" fill="{SAGE}" transform="rotate(-22 -24 26)"/><ellipse cx="24" cy="26" rx="12" ry="36" fill="{SAGE}" transform="rotate(22 24 26)"/></g>
{cat_sitting(860,720,1.5,"ginger",flip=True)}
{ball(300,760,36,BLUSH)}{ball(210,790,24,SAGE)}{sparkle(520,230,1.1,SAGE)}{paw(560,800,1.2,TAUPE,.4,-8)}{paw(640,850,1.2,TAUPE,.35,12)}'''
    return svg(1200, h, f"0 {vb_y} 1200 {h}", b, grad("bg", IVORY, SAND_L))


def scene_about():
    # Hochformat 4:5, 1200 x 1500: Katze mit Buch und Lampe, Bogenmotiv
    b = f'''<rect x="-200" y="-200" width="1600" height="1900" fill="url(#bg)"/>
<path d="M200,1180 V560 C200,330 380,210 600,210 C820,210 1000,330 1000,560 V1180 Z" fill="{SAGE_L}"/>
<path d="M270,1180 V580 C270,390 410,290 600,290 C790,290 930,390 930,580 V1180 Z" fill="{SAND_L}"/>
<g transform="translate(860,640)"><path d="M0,0 V260" stroke="{TAUPE}" stroke-width="10" stroke-linecap="round"/><path d="M-70,0 L-40,-90 H40 L70,0 Z" fill="#f2dfb8"/><circle cx="0" cy="-40" r="120" fill="#f7ecd2" opacity=".35"/></g>
<rect x="-200" y="1180" width="1600" height="500" fill="{SAND}"/><rect x="-200" y="1180" width="1600" height="12" fill="#fff" opacity=".25"/>
{book(330,1180,330,64,OLIVE,IVORY,-1)}{book(350,1116,300,54,SAND_L,COCOA,1)}{book(340,1062,310,50,TAUPE,COCOA,-1)}
{cat_loaf(500,1012,1.4,"dark")}{plant(790,1180,1.6,TAUPE)}
{heart(680,520,1.2)}{sparkle(380,470,1.4,SAGE)}{paw(300,1330,1.3,TAUPE,.4,-12)}{paw(420,1400,1.3,TAUPE,.35,10)}'''
    return svg(1200, 1500, "0 0 1200 1500", b, grad("bg", IVORY, SAND_L))


def main(out):
    os.makedirs(out, exist_ok=True)
    jobs = {
        "hero": scene_hero(), "story": scene_story(), "about": scene_about(),
        "world-start": scene_start(), "world-care": scene_care(), "world-home": scene_home(), "world-memories": scene_memories(),
        # Blog (3:2, 1200 x 800): gleicher Ausschnitt, oben und unten je 50 px beschnitten
        "blog-start": scene_start(50, 800), "blog-memories": scene_memories(50, 800), "blog-enrichment": scene_enrichment(50, 800),
        "blog-care": scene_care(50, 800), "blog-home": scene_home(50, 800),
    }
    for name, content in jobs.items():
        with open(os.path.join(out, f"{name}.svg"), "w", encoding="utf-8") as f:
            f.write(content)
    print(f"{len(jobs)} SVGs in {out}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "placeholders")
