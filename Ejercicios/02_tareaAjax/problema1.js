let chartInstance;

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // Obtener nombres de regiones
    const regiones = data.map(d => d.region);
    const select1 = document.getElementById('region1');
    const select2 = document.getElementById('region2');

    // Llenar selects
    regiones.forEach(region => {
      select1.innerHTML += `<option value="${region}">${region}</option>`;
      select2.innerHTML += `<option value="${region}">${region}</option>`;
    });

    const render = () => {
      const r1 = select1.value;
      const r2 = select2.value;

      // Obtener datos de las regiones seleccionadas
      const region1 = data.find(d => d.region === r1);
      const region2 = data.find(d => d.region === r2);

      // Si alguna región no se encuentra, salir
      if (!region1 || !region2) return;

      // Obtener todas las fechas (asumiendo que todas las regiones tienen las mismas fechas)
      const fechas = region1.confirmed.map(d => d.date);

      // Obtener los datos de confirmados (convertir a número)
      const datosR1 = region1.confirmed.map(d => Number(d.value));
      const datosR2 = region2.confirmed.map(d => Number(d.value));

      // Si ya existe un gráfico, destruirlo
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Crear nuevo gráfico
      chartInstance = new Chart(document.getElementById('grafico'), {
        type: 'line',
        data: {
          labels: fechas,
          datasets: [
            {
              label: r1,
              data: datosR1,
              borderColor: 'blue',
              fill: false
            },
            {
              label: r2,
              data: datosR2,
              borderColor: 'red',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Comparación de casos confirmados entre ${r1} y ${r2}`
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
                text: 'Casos confirmados'
              },
              beginAtZero: true
            }
          }
        }
      });
    };

    // Llamar render por defecto para mostrar algún gráfico inicial
    select1.value = regiones[0];
    select2.value = regiones[1] || regiones[0];
    render();

    // Asociar cambios a los select
    select1.addEventListener('change', render);
    select2.addEventListener('change', render);
  });
