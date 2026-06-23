# look-guides — Hub de documentación e imágenes

Repositorio central donde **cada producto** sube su documentación e imágenes.
Se publica en https://look-guides.netlify.app con **deploy continuo**: cada `git push` a `master` publica solo.

## Estructura

Cada producto tiene **su propia carpeta**. La raíz es solo del hub.

```
/                  index.html (hub) + infra.html
/<producto>/       docs e imagenes de ESE producto (ej: /agentflow/, /sin-vueltas/)
```

## Protocolo OBLIGATORIO para subir (para NO pisar lo de otros)

Como varios productos/agentes suben al mismo repo, **siempre sincronizá antes de pushear**:

1. Cloná fresco o actualizá:
   ```
   git clone https://github.com/arenazl/look-guides.git
   # o si ya lo tenés:
   git pull origin master
   ```
2. Poné tus archivos en **TU carpeta** `/<producto>/`. Creala si no existe.
3. **No toques ni borres** carpetas de otros productos.
4. Commit y push:
   ```
   git add <producto>/
   git commit -m "docs(<producto>): agrega imagenes/docs"
   git push origin master
   ```
5. Si el push es **rechazado** (alguien subió mientras tanto):
   ```
   git pull --rebase origin master
   git push origin master
   ```

**Regla de oro:** `pull` ANTES de `push`, y cada uno en SU carpeta. Así nunca se pierde el trabajo de otro.
