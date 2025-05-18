document.getElementById('btnConsultar').addEventListener('click', function() {
  const tabla = document.getElementById('opciones').value;
  
  fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ table: tabla })
  })
  .then(response => response.json())
  .then(data => {
    mostrarResultados(data, tabla);
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('resultados').innerHTML = 
      `<p style="color: red;">Error al cargar los datos: ${error.message}</p>`;
  });
});

function mostrarResultados(data, tabla) {
  // Verificar si data es null/undefined o no es un array
  if (!data || !Array.isArray(data)) {
    document.getElementById('resultados').innerHTML = 
      `<p style="color: red;">Error: No se recibieron datos válidos para ${tabla}</p>`;
    return;
  }

  if (data.length === 0) {
    document.getElementById('resultados').innerHTML = 
      `<p>No se encontraron registros en la tabla ${tabla}</p>`;
    return;
  }

  // Crear tabla HTML
  let html = `<h2>${tabla} (${data.length} registros)</h2>`;
  html += '<table><thead><tr>';

  // Encabezados de la tabla
  const columnas = Object.keys(data[0]);
  columnas.forEach(col => {
    html += `<th>${col}</th>`;
  });
  html += '</tr></thead><tbody>';

  // Filas de datos
  data.forEach(fila => {
    html += '<tr>';
    columnas.forEach(col => {
      html += `<td>${fila[col] !== null ? fila[col] : 'NULL'}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  document.getElementById('resultados').innerHTML = html;
}