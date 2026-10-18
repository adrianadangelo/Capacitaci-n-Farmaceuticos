// Web App que resume la hoja de asistencia para el dashboard.
// Hoja "Asistencia" con columnas: Área | Tienda | Actividad | Asistió (Sí/No)
// Actividad debe usar las claves: dcp, mostrador, glp1, mayor, meno, mujer, anti
function doGet() {
  const rows = SpreadsheetApp.getActive().getSheetByName('Asistencia').getDataRange().getValues().slice(1);
  const areas = {};
  rows.forEach(([area, tienda, act, asistio]) => {
    if (!area || !act) return;
    const a = areas[area] = areas[area] || { nombre: area, actividades: {} };
    const x = a.actividades[act] = a.actividades[act] || { formados: 0, meta: 0, tiendas: {} };
    const t = x.tiendas[tienda] = x.tiendas[tienda] || { nombre: tienda, formados: 0, meta: 0 };
    x.meta++; t.meta++;
    if (String(asistio).trim().toLowerCase().startsWith('s')) { x.formados++; t.formados++; }
  });
  const out = Object.values(areas).map(a => {
    Object.values(a.actividades).forEach(x => x.tiendas = Object.values(x.tiendas));
    return a;
  });
  const tz = Session.getScriptTimeZone();
  return ContentService.createTextOutput(JSON.stringify({
    actualizado: Utilities.formatDate(new Date(), tz, 'dd/MM/yyyy HH:mm'), areas: out
  })).setMimeType(ContentService.MimeType.JSON);
}
