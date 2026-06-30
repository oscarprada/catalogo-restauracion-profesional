# Catálogo Offline de Restauración Ecológica

Proyecto profesional base para Parques Nacionales Naturales de Colombia - DTPA.

## Objetivo
Generar un catálogo HTML navegable sin conexión, con fichas técnicas, fotografías, buscador, favoritos, estadísticas, impresión y exportación a PDF mediante el navegador.

## Herramientas usadas
- Visual Studio Code
- JavaScript
- React + Vite
- Node.js
- PostgreSQL
- HTML/CSS/JS offline

## Uso rápido offline
Abra el archivo:

```txt
offline/index.html
```

Si el navegador bloquea la carga local de `especies.json`, abra la carpeta `offline` con la extensión **Live Server** de Visual Studio Code.

## Uso con React
```bash
npm run install:all
npm run dev
```

## Backend opcional
```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

## Base de datos
Ejecute `database/schema.sql` en PostgreSQL.

## Actualizar especies
Edite:

```txt
offline/especies.json
frontend/src/data/especies.json
```

Agregue las imágenes en `offline/assets` y `frontend/public/assets`.

## Funcionalidades incluidas
- Inicio institucional
- Catálogo de especies
- Buscador en tiempo real
- Fichas técnicas
- Galería base por especie
- Favoritos con localStorage
- Estadísticas
- Modo claro/oscuro
- Impresión y guardado como PDF
- Diseño responsive
- Arquitectura preparada para crecer a cientos o miles de especies
