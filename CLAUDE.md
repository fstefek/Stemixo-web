# Stemixo – web firmy

Statický jednostránkový web stavební firmy **Stemixo** (Filip Štefek, Kopřivnicko).
Čisté HTML + CSS + vanilla JS, žádný build, žádný framework, žádný git.
Náhled: otevřít `index.html` v prohlížeči (případně `npx serve .`).

## Soubory webu

| Soubor | Obsah |
|---|---|
| `index.html` | celý obsah stránky (texty, služby, galerie, kontakty) |
| `style.css` | styly, proměnné barev v `:root`, responzivita (1024 / 768 / 480 px) |
| `main.js` | sticky header, hamburger, parallax hero, fade-in animace, „Zobrazit více“ v galerii, lightbox, active nav |
| `favicon.png` | ikona 256×256 |
| `Logo/PNG-…/PNG/` | logo SMK (bílé/černé, symbol, text) – na webu `smk-logo-bile-rgb.png` |
| `Logo/svg-…/svg/` | totéž ve SVG (zatím nepoužito) |
| `Stemixo_foto/` | fotky realizací (`.jfif` = JPEG z WhatsAppu, 1–1 MB, plné rozlišení) |
| `Stemixo_foto/Sladkova/` | 29 fotek zakázky REKO Sládková (květen 2026) – všechny v galerii |
| `Stemixo_foto/Dlažba - Kořenek/` | 3 fotky – **zatím nepoužité** |

Ostatní obsah adresáře **není součást webu**: `Práce/` (nabídky, vyúčtování, prezentace), `Stemixo APP/` a `stavebni_firma_app/` (Flutter prototypy aplikace), `*.zip` (zálohy/balíky fotek a loga).

## Struktura stránky (sekce v `index.html`)

1. **Header** – logo, navigace (O nás / Služby / Realizace / Kontakt)
2. **Hero** (`#hero`) – pozadí `d0bb45b2-….jfif`, nadpis „Stavíme s precizností“, badge „50+ projektů“
3. **O nás** (`#o-nas`) – 2 fotky, text, statistiky 50+ projektů / 5+ let praxe
4. **Služby** (`#sluzby`) – 6 karet `.service-card` (Zámkové dlažby, Malířské práce, Sádrokarton, Omítky & fasáda, Rekonstrukce, Zemní práce), ikony inline SVG
5. **Proč my** (`.why`) – 4 karty `.why-card`
6. **Realizace** (`#realizace`) – galerie `#galleryGrid`; prvních 12 položek viditelných, další mají třídu `hidden` a zobrazí se tlačítkem `#loadMore`
7. **Kontakt** (`#kontakt`) – telefon, e-mail, Instagram; kontaktní formulář je **zakomentovaný** (JS na něj je připravený – posílá `mailto:`)
8. **Footer** – navigace, kontakty, copyright

## Jak dělat běžné úpravy

- **Přidat fotku do galerie:** nahrát do `Stemixo_foto/` (ideálně podsložka podle zakázky) a přidat
  `<div class="gallery__item"><img src="Stemixo_foto/…" alt="Realizace – …" loading="lazy"></div>`.
  Pořadí v HTML = pořadí v galerii; za 12. položkou přidávat `class="gallery__item hidden"`.
  Názvy souborů s mezerami fungují, ale nové soubory raději pojmenovávat bez mezer a diakritiky.
- **Barvy/fonty:** proměnné v `style.css` `:root` (akcent `#c8861a`, tmavá `#1d1d1b`), font Inter z Google Fonts.
- **Kontakty** jsou na dvou místech: sekce Kontakt + footer.

## Zjištěné nesrovnalosti (k rozhodnutí při aktualizaci)

- E-mail: zobrazuje se `Stemixo@lubina.cz`, ale odkaz `mailto:` vede na `Filip.stefek@seznam.cz` (sekce Kontakt i footer, a také `main.js` formulář).
- Copyright ve footeru: `© 2025` → aktualizovat.
- `style.css` obsahuje nepoužívané třídy `.lightbox*` (skutečný lightbox používá `#lightbox` / `.lb-close`).
- `.footer__brand p` je ve stylech, ale ve footeru žádný text není.
- Galerie zobrazuje původní, nezmenšené fotky (~47 MB složka) – pro rychlost webu by se hodily zmenšené verze (např. 1600 px, WebP/JPEG ~200 kB) a náhledy.
- Chybí Open Graph meta tagy (náhled při sdílení), `lang`/`description` jsou OK.
- 16 fotek ve `Stemixo_foto/` + 3 z „Dlažba - Kořenek“ není na webu použito.

## Nasazení

V adresáři není žádná konfigurace hostingu (žádný git, CNAME, .htaccess). Nahrává se ručně jako statické soubory –
na server patří jen: `index.html`, `style.css`, `main.js`, `favicon.png`, `Logo/`, `Stemixo_foto/` (bez zipů).
