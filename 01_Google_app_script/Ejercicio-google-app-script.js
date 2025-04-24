function enviarRecordatorios() {
  // Obtiene la hoja activa del archivo de Google Sheets
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Obtiene todos los datos de la hoja (incluye encabezados)
  var datos = hoja.getDataRange().getValues();
  
  // Crea un objeto con la fecha actual
  var hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Resetea la hora para comparar solo por día

  // Arreglo para guardar las tareas pendientes o vencidas
  var tareasPendientes = [];

  // Recorre cada fila (comienza desde 1 para saltarse el encabezado)
  for (var i = 1; i < datos.length; i++) {
    var tarea = datos[i][0];                // Columna A: nombre de la tarea
    var fechaLimite = new Date(datos[i][1]); // Columna B: fecha límite
    var estado = datos[i][2];               // Columna C: estado (Hecho, Pendiente)

    fechaLimite.setHours(0, 0, 0, 0); // Igual que 'hoy', resetea la hora

    // Si la tarea NO está hecha y su fecha es hoy o anterior
    if (estado.toLowerCase() !== 'hecho' && fechaLimite <= hoy) {
      // Agrega la tarea a la lista de pendientes con su fecha
      tareasPendientes.push("📌 " + tarea + " (fecha: " + datos[i][1] + ")");
    }
  }

  // Si hay tareas pendientes, envía un correo con el resumen
  if (tareasPendientes.length > 0) {
    var mensaje = "Estas son las tareas pendientes o vencidas:\n\n" + tareasPendientes.join("\n");

    // Envía el correo al usuario que está usando el script
    MailApp.sendEmail(Session.getActiveUser().getEmail(), "🔔 Recordatorio de tareas", mensaje);
  }
}
