# Campus Farmacéutico Venezuela · Plan de Capacitación

Dashboard interactivo para GitHub Pages. Un solo archivo: `index.html`.

## Publicar
1. Crea un repositorio (por ejemplo `Capacitacion-Venezuela`) y sube `index.html` y este README.
2. En **Settings › Pages**, elige la rama `main` y la carpeta raíz.
3. El dashboard queda en `https://<usuario>.github.io/<repositorio>/`.

## Editar
Todo se configura al inicio del `<script>` en `index.html`:
- `CONFIG.areas`: nombre de cada área, sala de capacitación, los 2 facilitadores y número de tiendas.
- `CONFIG.statusUrl`: URL de la Web App que alimenta el estatus en vivo.
- `ACTIVIDADES` y `MODULOS`: fechas (formato `AAAA-MM`), población, duración y contenido.
- `DINAMICAS`: instructivos de la Práctica Aplicada.

## Estatus en vivo (Google Apps Script)
La pestaña *Estatus en vivo* lee un JSON con esta forma:

```json
{
  "actualizado": "18/10/2026 15:30",
  "areas": [
    { "nombre": "Área 1",
      "actividades": {
        "dcp":  { "formados": 12, "meta": 20, "tiendas": [ { "nombre": "Tienda X", "formados": 1, "meta": 1 } ] },
        "glp1": { "formados": 0,  "meta": 20, "tiendas": [] }
      } }
  ]
}
```

Claves de actividad: `dcp`, `mostrador`, `glp1`, `mayor`, `meno`, `mujer`, `anti`.
`apps-script.gs` trae un ejemplo que arma ese JSON desde una hoja de asistencia con las columnas
`Área | Tienda | Actividad | Asistió (Sí/No)`. Publícalo como Web App (acceso: cualquier persona) y pega la URL en `CONFIG.statusUrl`.

Nota: GitHub Pages es público si el repositorio lo es. El estatus solo muestra totales, sin nombres de participantes.
