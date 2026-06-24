/**
 * Generador dinamico del hub look-guides.
 * Escanea /apps/<app>/*.html y genera:
 *   - /index.html              -> hub con una card por app (+ card fija de Infraestructura)
 *   - /apps/<app>/index.html   -> sub-home de la app, listando sus paginas
 *
 * Lo corre Netlify en cada deploy (build command: "node build.js"), asi cuando
 * un proyecto pushea su carpeta a /apps/, el index se regenera solo. No hay deps.
 *
 * Nombre de la app y de cada pagina: se toman del <title> "App — Pagina".
 * Si un HTML no respeta ese formato, cae al nombre de carpeta / nombre de archivo.
 */
const fs = require('fs')
const path = require('path')

const ROOT = __dirname
const APPS_DIR = path.join(ROOT, 'apps')
const DASH = /\s+[—–-]\s+/ // separador "App — Pagina" (em/en dash o guion)

const COLORS = [
  { bar: 'bg-sky-500', txt: 'text-sky-600', hov: 'group-hover:text-sky-600' },
  { bar: 'bg-emerald-500', txt: 'text-emerald-600', hov: 'group-hover:text-emerald-600' },
  { bar: 'bg-amber-500', txt: 'text-amber-600', hov: 'group-hover:text-amber-600' },
  { bar: 'bg-violet-500', txt: 'text-violet-600', hov: 'group-hover:text-violet-600' },
  { bar: 'bg-rose-500', txt: 'text-rose-600', hov: 'group-hover:text-rose-600' },
  { bar: 'bg-cyan-500', txt: 'text-cyan-600', hov: 'group-hover:text-cyan-600' },
]

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const cap = (s) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

function titleOf(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i)
  return m ? m[1].trim() : ''
}

function scanApp(folder) {
  const dir = path.join(APPS_DIR, folder)
  const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.html') && f.toLowerCase() !== 'index.html')
  let appName = ''
  const pages = files.sort().map((f) => {
    const title = titleOf(fs.readFileSync(path.join(dir, f), 'utf8'))
    let pageName = f.replace(/\.html$/i, '')
    if (DASH.test(title)) {
      const [a, ...rest] = title.split(DASH)
      if (!appName) appName = a.trim()
      pageName = rest.join(' — ').trim()
    } else if (title) {
      pageName = title
    }
    return { file: f, name: pageName }
  })
  return { folder, name: appName || cap(folder), pages }
}

function subIndex(app) {
  const cards = app.pages.map((p, i) => {
    const c = COLORS[i % COLORS.length]
    return `      <a href="${esc(p.file)}" class="group bg-white rounded-xl shadow hover:shadow-lg transition border border-slate-200 overflow-hidden">
        <div class="h-2 ${c.bar}"></div>
        <div class="p-6">
          <h3 class="font-bold text-slate-900 text-lg ${c.hov}">${esc(p.name)}</h3>
          <p class="text-xs text-slate-400 mt-3 mono">${esc(p.file)}</p>
        </div>
      </a>`
  }).join('\n')
  return page({
    title: `${app.name} — Documentación`,
    eyebrow: 'Aplicación',
    h1: esc(app.name),
    lead: `Capturas y documentación de ${esc(app.name)}. ${app.pages.length} página${app.pages.length === 1 ? '' : 's'}.`,
    nav: `      <a href="../../index.html" class="px-3 py-2 rounded hover:bg-slate-800 text-sky-400 font-medium">&larr; Hub</a>`,
    gridTitle: 'Páginas',
    grid: cards || '<p class="text-slate-400">Esta app todavía no subió páginas.</p>',
  })
}

function hub(apps) {
  // Card fija de Infraestructura (doc propio del hub) + cards dinamicas de cada app
  const infraCard = `    <a href="infraestructura/" class="group bg-white rounded-xl shadow hover:shadow-lg transition border border-slate-200 overflow-hidden">
      <div class="h-2 bg-sky-500"></div>
      <div class="p-6">
        <div class="flex items-center gap-2 text-sky-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/></svg>
          <span class="text-xs font-bold uppercase tracking-wide">Infraestructura</span>
        </div>
        <h3 class="font-bold text-slate-900 mt-3 text-lg group-hover:text-sky-600">Saneamiento, Deploy Continuo y Costos</h3>
        <p class="text-sm text-slate-500 mt-2">Inventario de APIs, deploy automático en 3 nubes, auditoría de keys y costos.</p>
      </div>
    </a>`
  const appCards = apps.map((app, i) => {
    const c = COLORS[i % COLORS.length]
    return `    <a href="apps/${esc(app.folder)}/" class="group bg-white rounded-xl shadow hover:shadow-lg transition border border-slate-200 overflow-hidden">
      <div class="h-2 ${c.bar}"></div>
      <div class="p-6">
        <div class="flex items-center gap-2 ${c.txt}">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          <span class="text-xs font-bold uppercase tracking-wide">App</span>
        </div>
        <h3 class="font-bold text-slate-900 mt-3 text-lg ${c.hov}">${esc(app.name)}</h3>
        <p class="text-sm text-slate-500 mt-2">${app.pages.length} página${app.pages.length === 1 ? '' : 's'} de documentación.</p>
        <p class="text-xs text-slate-400 mt-4 mono">apps/${esc(app.folder)}/</p>
      </div>
    </a>`
  }).join('\n')
  const navLinks = apps.map((a) => `      <a href="apps/${esc(a.folder)}/" class="px-3 py-2 rounded hover:bg-slate-800">${esc(a.name)}</a>`).join('\n')
  return page({
    title: 'Centro de Documentación — arenazl',
    eyebrow: 'Repositorio técnico',
    h1: 'Documentación de proyectos',
    lead: 'Hub central de documentación de cada proyecto. Cada app sube sus páginas estáticas a su carpeta y aparece acá automáticamente.',
    nav: `      <a href="index.html" class="px-3 py-2 rounded hover:bg-slate-800 text-sky-400 font-medium">Inicio</a>
      <a href="infraestructura/" class="px-3 py-2 rounded hover:bg-slate-800">Infraestructura</a>
${navLinks}`,
    gridTitle: 'Aplicaciones y documentos',
    grid: `${infraCard}\n${appCards}`,
  })
}

function page({ title, eyebrow, h1, lead, nav, gridTitle, grid }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>.mono{font-family:ui-monospace,Menlo,monospace}</style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen flex flex-col">

<nav class="bg-slate-900 text-white sticky top-0 z-10 shadow">
  <div class="max-w-6xl mx-auto px-6 h-16 flex items-center gap-1 text-sm overflow-x-auto">
${nav}
  </div>
</nav>

<header class="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
  <div class="max-w-6xl mx-auto px-6 py-16">
    <p class="text-sky-400 font-semibold tracking-wide text-sm uppercase">${esc(eyebrow)}</p>
    <h1 class="text-4xl font-bold mt-2">${h1}</h1>
    <p class="text-slate-300 mt-4 max-w-2xl text-lg">${esc(lead)}</p>
  </div>
</header>

<main class="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
  <h2 class="text-xl font-bold text-slate-900 mb-6">${esc(gridTitle)}</h2>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
${grid}
  </div>
</main>

<footer class="bg-slate-900 text-slate-400 text-sm">
  <div class="max-w-6xl mx-auto px-6 py-6">
    <p>Centro de Documentación &middot; generado automáticamente desde /apps &middot; arenazl@gmail.com</p>
  </div>
</footer>

</body>
</html>
`
}

// --- run ---
const apps = fs.existsSync(APPS_DIR)
  ? fs.readdirSync(APPS_DIR)
      .filter((d) => fs.statSync(path.join(APPS_DIR, d)).isDirectory())
      .sort()
      .map(scanApp)
  : []

for (const app of apps) {
  fs.writeFileSync(path.join(APPS_DIR, app.folder, 'index.html'), subIndex(app))
}
fs.writeFileSync(path.join(ROOT, 'index.html'), hub(apps))

console.log(`[build] ${apps.length} app(s): ${apps.map((a) => `${a.folder}(${a.pages.length})`).join(', ')}`)
console.log('[build] index.html + sub-indexes generados OK')
