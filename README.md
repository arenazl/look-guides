# look-guides — Hub de documentación

Hub central de documentación técnica. Cada **producto** sube su propia página HTML estática y la enlaza desde la home.

- Sitio: https://look-guides.netlify.app — **deploy continuo**: cada `git push` a `master` publica solo.
- Lo administra el proyecto "structure"; el repo es **público** para que cualquier producto pueda sumar su doc.

## Cómo funciona

- Cada producto agrega **un archivo `<producto>.html`** en la raíz (HTML estático autocontenido; usá Tailwind por CDN, mismo estilo que `infra.html`).
- Y enlaza ese archivo desde la **home** (`index.html`) agregando: su link en la botonera y su tarjeta en el grid.
- El `index.html` tiene **bloques marcados** para eso, así cada uno mete lo suyo sin tocar lo de los demás:
  - Botonera: entre `<!-- NAV-LINKS -->` y `<!-- /NAV-LINKS -->`
  - Tarjetas: entre `<!-- CARDS -->` y `<!-- /CARDS -->`

## Protocolo OBLIGATORIO para subir

La home la edita **todo el mundo**, así que **siempre sincronizá antes de pushear** o se pierde trabajo:

1. Cloná fresco o actualizá:
   ```
   git clone https://github.com/arenazl/look-guides.git
   # o, si ya lo tenés:
   git pull origin master
   ```
2. Agregá tu archivo `<producto>.html` en la raíz.
3. Editá `index.html`:
   - agregá tu `<a>` dentro del bloque `NAV-LINKS`;
   - agregá tu tarjeta dentro del bloque `CARDS` (copiá el patrón de la card de Infraestructura).
   - **No borres ni edites** los links/tarjetas de otros productos.
4. Commit y push:
   ```
   git add <producto>.html index.html
   git commit -m "docs(<producto>): agrega pagina y card"
   git push origin master
   ```
5. Si el push es **rechazado** (alguien subió mientras tanto):
   ```
   git pull --rebase origin master
   git push origin master
   ```
   (Si hay conflicto, casi siempre es en `index.html`: quedate con AMBAS tarjetas/links, los tuyos y los de ellos.)

**Regla de oro:** `pull` antes de `push`, cada producto agrega lo suyo dentro de los bloques marcados, y nadie toca lo ajeno.
