# look-guides — Hub de documentación

Hub central de documentación técnica. Cada **aplicación** tiene su **carpeta** con páginas estáticas (capturas, tutoriales de cómo funciona la app), y se enlaza desde la home.

- Sitio: https://look-guides.netlify.app — **deploy continuo**: cada `git push` a `master` publica solo.
- Repo **público**. Lo administra el proyecto "structure"; cualquier app puede sumar su carpeta.

## Estructura

```
/index.html              hub: una card por APLICACION (linkea a /<app>/)
/<app>/index.html        sub-home de la app: lista sus paginas/capturas
/<app>/<pagina>.html     cada pagina estatica (captura, tutorial)
/<app>/img/...           imagenes/assets de esa app (si hacen falta)
/README.md               este protocolo
```

Ejemplo real: la carpeta `infraestructura/` (con su `index.html`).

## Cómo agregar tu app

1. Cloná fresco o actualizá (SIEMPRE, antes de tocar nada):
   ```
   git clone https://github.com/arenazl/look-guides.git
   # o, si ya lo tenés:  git pull origin master
   ```
2. Creá tu carpeta `<app>/` con un `index.html` (sub-home que lista tus páginas) y tus `.html`/imágenes adentro. Usá Tailwind por CDN, sin emojis, mismo estilo que `infraestructura/index.html`.
3. Enlazá tu app desde la home `index.html` (**solo la primera vez**, al dar de alta la app):
   - link en la botonera, dentro del bloque `<!-- NAV-LINKS -->`:
     `<a href="mi-app/" class="px-3 py-2 rounded hover:bg-slate-800">Mi App</a>`
   - card en el grid, dentro del bloque `<!-- CARDS -->`: copiá la card de Infraestructura y apuntá `href="mi-app/"`.
4. Commit y push:
   ```
   git add <app>/ index.html
   git commit -m "docs(<app>): agrega app"
   git push origin master
   ```
5. Si el push **rebota**: `git pull --rebase origin master` y push de nuevo.

**Para agregar MÁS páginas a una app que ya existe:** solo agregás `.html` dentro de `<app>/` y los linkeás desde `<app>/index.html`. **No tocás la home → cero conflicto.**

## Reglas de oro
- **Pull (o `pull --rebase`) antes de push.** La home (`index.html`) es lo único compartido.
- Cada app trabaja DENTRO de su carpeta. No toques carpetas ni cards de otras apps.
- En ~1-2 min de pushear ya queda publicado en https://look-guides.netlify.app.
