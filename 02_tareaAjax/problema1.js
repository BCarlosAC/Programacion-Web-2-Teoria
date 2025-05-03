fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const regiones = [...new Set(data.map(d => d.region))];
    const select1 = document.getElementById('region1');
    const select2 = document.getElementById('region2');

    regiones.forEach(region => {
      select1.innerHTML += `<option value="${region}">${region}</option>`;
      select2.innerHTML += `<option value="${region}">${region}</option>`;
    });

    const render = () => {
      const r1 = select1.value;
      const r2 = select2.value;

      const fechas = [...new Set(data.map(d => d.fecha))];
      const datosR1 = fechas.map(f =>
        data.find(d => d.region === r1 && d.fecha === f)?.confirmados || 0
      );
      const datosR2 = fechas.map(f =>
        data.find(d => d.region === r2 && d.fecha === f)?.confirmados || 0
      );

      new Chart(document.getElementById('grafico'), {
        type: 'line',
        data: {
          labels: fechas,
          datasets: [
            { label: r1, data: datosR1, borderColor: 'blue' },
            { label: r2, data: datosR2, borderColor: 'red' }
          ]
        }
      });
    };

    select1.addEventListener('change', render);
    select2.addEventListener('change', render);
  });
