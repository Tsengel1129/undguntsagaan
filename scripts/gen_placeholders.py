#!/usr/bin/env python3
"""Generate clearly-labelled solid-colour placeholder JPGs.

These are PLACEHOLDERS ONLY. The client replaces each file in /public/images
with a real Mongolian photo of the matching subject (see README image map).
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

# Brand-tinted background per category (R, G, B)
PALETTE = {
    "hero": (26, 23, 20),
    "racehorse": (60, 46, 40),
    "trainer": (47, 54, 58),
    "het-hutga": (40, 30, 28),
    "hoorog": (44, 34, 24),
    "silver": (38, 40, 44),
    "magazine": (33, 28, 26),
}
ACCENT = (200, 16, 46)   # brand red
GOLD = (176, 141, 58)    # heritage gold
CREAM = (247, 243, 236)


def font(size):
    for path in [
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default()


def make(name, w, h, bg, label, sub, accent=ACCENT):
    img = Image.new("RGB", (w, h), bg)
    d = ImageDraw.Draw(img)
    # subtle accent frame
    pad = max(int(min(w, h) * 0.04), 14)
    d.rectangle([pad, pad, w - pad, h - pad], outline=accent, width=4)
    # corner tick
    d.line([pad, pad + 60, pad, pad], fill=accent, width=8)
    d.line([pad, pad, pad + 60, pad], fill=accent, width=8)

    f1 = font(int(min(w, h) * 0.075))
    f2 = font(int(min(w, h) * 0.04))
    f3 = font(int(min(w, h) * 0.03))

    def center(text, fnt, y, fill):
        bbox = d.textbbox((0, 0), text, font=fnt)
        tw = bbox[2] - bbox[0]
        d.text(((w - tw) / 2, y), text, font=fnt, fill=fill)

    cy = h / 2
    center(label, f1, cy - int(min(w, h) * 0.10), CREAM)
    if sub:
        center(sub, f2, cy + int(min(w, h) * 0.02), GOLD)
    center("PLACEHOLDER — replace with real photo", f3,
           h - pad - int(min(w, h) * 0.06), (255, 255, 255, 180))

    img.save(os.path.join(OUT, name), "JPEG", quality=82)
    print("wrote", name)


# Hero (16:9)
make("hero.jpg", 1920, 1080, PALETTE["hero"],
     "Undgun Tsagaan", "Өндгөн цагаан · Hero image")

# Racehorses (4:3 landscape) 1..9
for i in range(1, 10):
    make(f"racehorse-{i}.jpg", 1200, 900, PALETTE["racehorse"],
         f"Racehorse {i}", "Морь · racing bloodline")

# Trainers (4:5 portrait) 1..9
for i in range(1, 10):
    make(f"trainer-{i}.jpg", 900, 1125, PALETTE["trainer"],
         f"Trainer {i}", "Уяач · horse trainer")

# Heritage — хэт хутга (square) 1..3
for i in range(1, 4):
    make(f"het-hutga-{i}.jpg", 1000, 1000, PALETTE["het-hutga"],
         f"Het Hutga {i}", "Хэт хутга · knife set", accent=GOLD)

# Heritage — хөөрөг (square) 1..3
for i in range(1, 4):
    make(f"hoorog-{i}.jpg", 1000, 1000, PALETTE["hoorog"],
         f"Hoorog {i}", "Хөөрөг · snuff bottle", accent=GOLD)

# Heritage — silver / craft (square) 1..3
for i in range(1, 4):
    make(f"silver-{i}.jpg", 1000, 1000, PALETTE["silver"],
         f"Silver Craft {i}", "Мөнгөн эдлэл · silverwork", accent=GOLD)

# Magazine covers (3:2) 1..6
for i in range(1, 7):
    make(f"magazine-{i}.jpg", 1200, 800, PALETTE["magazine"],
         f"Article {i}", "Сэтгүүл · cover image")

print("done")
