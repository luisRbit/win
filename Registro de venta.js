function registrarVenta() {
    const ventas = JSON.parse(localStorage.getItem("ventas") || "[]");
    ventas.push(new Date().toISOString());
    localStorage.setItem("ventas", JSON.stringify(ventas));
    actualizarResumen();
  }
  
  function actualizarResumen() {
    const ventas = JSON.parse(localStorage.getItem("ventas") || "[]").map(fecha => new Date(fecha));
    const ahora = new Date();
    
    let hoy = 0, semana = 0, mes = 0, anio = 0;
  
    ventas.forEach(fecha => {
      const esMismoDia = fecha.toDateString() === ahora.toDateString();
      const esMismaSemana = getSemana(fecha) === getSemana(ahora) && fecha.getFullYear() === ahora.getFullYear();
      const esMismoMes = fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
      const esMismoAnio = fecha.getFullYear() === ahora.getFullYear();
  
      if (esMismoDia) hoy++;
      if (esMismaSemana) semana++;
      if (esMismoMes) mes++;
      if (esMismoAnio) anio++;
    });
  
    document.getElementById("hoy").textContent = hoy;
    document.getElementById("semana").textContent = semana;
    document.getElementById("mes").textContent = mes;
    document.getElementById("anio").textContent = anio;
  }
  
  function getSemana(fecha) {
    const primerDia = new Date(fecha.getFullYear(), 0, 1);
    const dias = Math.floor((fecha - primerDia) / (24 * 60 * 60 * 1000));
    return Math.ceil((fecha.getDay() + 1 + dias) / 7);
  }
  
  window.onload = actualizarResumen;