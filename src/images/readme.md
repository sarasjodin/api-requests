# Images

Här lagras bilder för projektet. Lägg bilder i optimerat format (t.ex. .svg .jpg, .png, .webp och avif).
Konvertera med https://squoosh.app/
Gratis bildhanterare https://www.photopea.com/
Tiny png för att minimera png filer https://tinypng.com/ för mac http://pngmini.com/ med instruktion http://how-to.wikia.com/wiki/How_to_reduce_the_file_size_of_a_PNG_file

Använd picture elementet
Använd loading="lazy" "below the fold"

<picture>
    <source srcset="bild.avif" type="image/avif" >
    <source srcset="bild.webp" type="image/webp">
    <img src="bild.jpg" alt="Beskrivande text för bilden" width="800" height="600" loading="lazy">
</picture>

Ovan är ett grundläggande exempel som:

Först försöker använda AVIF-formatet
Faller tillbaka på WebP om AVIF inte stöds
Använder en vanlig JPG som sista alternativ

Grundläggande struktur:
picture är en container för flera bildkällor
source definierar olika bildformat och storlekar
img används som fallback och måste alltid finnas med
Moderna bildformat:
AVIF: Nyaste formatet med bäst komprimering
WebP: Brett stöd och bra komprimering
JPEG/PNG som fallback
Viktiga attribut:
srcset: Definierar olika bildstorlekar och deras bredd
sizes: Talar om för webbläsaren hur stor del av viewporten bilden ska uppta
type: Anger bildformatet
media: För art direction (olika utsnitt vid olika skärmstorlekar)
Best practices:
Ange alltid width och height för att förhindra layout shifts
Använd loading="lazy" för lazy loading
Ha alltid med en meningsfull alt-text

## Animeringar

GIF, PNG, Avif och WebP kan alla animeras.
På Giphy.com kan man ladda ner animationer att använda.
https://gifs.com/
Skapa gifs i Photoshop: Archive / Script / Load files in stack - Window / Timeline (Animation)

## Bildvisning med plugin

Lightbox2 - https://lokeshdhakar.com/projects/lightbox2/
