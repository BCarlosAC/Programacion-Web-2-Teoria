fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // Filtrar regiones excepto Lima y Callao
    const regionesFiltradas = data.filter(d => d.region !== "Lima" && d.region !== "Callao");

    // Obtener fechas desde la primera región filtrada
    const fechas = regionesFiltradas[0].confirmed.map(d => d.date);

    // Preparar datasets para cada región
    const datasets = regionesFiltradas.map((region, index) => {
      const color = `hsl(${(index * 50) % 360}, 70%, 50%)`; // Generar color distinto para cada región

      return {
        label: region.region,
        data: region.confirmed.map(d => Number(d.value)),
        borderColor: color,
        fill: false
      };
    });

    // Crear gráfico
    new Chart(document.getElementById('grafico'), {
      type: 'line',
      data: {
        labels: fechas,
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Crecimiento Diario de Confirmados por Región (sin Lima y Callao)'
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Fecha'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Casos Confirmados'
            },
            beginAtZero: true
          }
        }
      }
    });
  });
