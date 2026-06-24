# look-guides — Hub de documentación

Hub central donde cada proyecto publica sus **páginas estáticas** (capturas, tutoriales de cómo funciona la app). El índice se arma **solo**: vos subís tu carpeta y aparece automáticamente.

- **Repo:** `arenazl/look-guides` → https://github.com/arenazl/look-guides (branch `master`)
- **Sitio:** https://look-guides.netlify.app — **deploy continuo** (cada push publica).
- Lo administra el proyecto **structure**. Vos solo subís tu carpeta; no toques nada más.

## Cómo funciona (importante)

NO se edita el index a mano. En cada deploy, Netlify corre `build.js`, que **escanea `/apps/`** y genera:
- el **índice del hub** (una tarjeta por app),
- y un **sub-índice dentro de cada app** que lista sus páginas.

O sea: vos subís `apps/<tu-app>/*.html` y **el hub se actualiza solo**. Por eso las apps nunca se pisan: cada una vive en su carpeta y nadie edita el index.

## Cómo publicar tu app (paso a paso)

1. Cloná o actualizá (siempre antes de tocar):
   ```
   git clone https://github.com/arenazl/look-guides.git
   # o, si ya lo tenés:  git pull --rebase origin master
   ```
2. Tu app va en **`apps/<tu-app>/`**. Si tu carpeta no existe, **creala** — el nombre de la carpeta es el nombre de tu app (minúsculas/kebab-case, ej. `apps/mi-app/`). Esa carpeta es tuya.
3. Poné ahí tus **HTML estáticos** (uno por pantalla/captura) e imágenes/SVG si hacen falta. Usá Tailwind por CDN, sin emojis.
   - **IMPORTANTE — el `<title>` manda.** Poné en cada HTML:
     `<title>Nombre De Tu App — Nombre De La Página</title>`
     El hub usa la parte antes del `—` como **nombre de la app** (en la tarjeta) y la de después como **nombre de la página**. Ej: `<title>Mi App — Dashboard</title>`.
4. **No toques** `index.html`, `build.js`, `netlify.toml`, ni las carpetas de otras apps. El index es **generado** (de hecho no está en el repo, lo crea el build).
5. Commit y push:
   ```
   git add apps/<tu-app>/
   git commit -m "docs(<tu-app>): agrega/actualiza paginas"
   git push origin master
   ```
   Si el push **rebota**: `git pull --rebase origin master` y push de nuevo. (Casi nunca hay conflicto, porque cada uno trabaja en su carpeta.)
6. En ~1-2 min: tu app aparece en https://look-guides.netlify.app con su tarjeta, y dentro tus páginas.

## Navegación resultante

```
look-guides.netlify.app/                      -> hub (una card por app)
look-guides.netlify.app/apps/<tu-app>/        -> tus páginas (sub-índice auto-generado)
look-guides.netlify.app/apps/<tu-app>/x.html  -> cada página tuya
```

## Reglas de oro
- Cada app trabaja **solo dentro de `apps/<su-nombre>/`**. No toques lo ajeno ni el index.
- `pull --rebase` antes de push.
- El `<title>` con formato `App — Página` es lo que hace que tu app y tus páginas salgan bien nombradas en el hub.
