const API_URL = "https://sheetdb.io/api/v1/xtlc7zhz4mbtp";// pega aca el link de shetDB

// Cargar datos
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("productos");

   data.forEach((item, index) => {
  contenedor.innerHTML += `
    <div class="col-md-6">
      <div class="card shadow-sm p-3">

        <h5 class="fw-bold mb-3">${item.Producto}</h5>

        <label class="form-label">Precio Kilo</label>
        <input type="number" class="form-control mb-3"
               value="${item.Precio_Kilo}" id="kilo-${index}">

        <label class="form-label">Precio Mayor</label>
        <input type="number" class="form-control"
               value="${item.Precio_Mayor}" id="mayor-${index}">

      </div>
    </div>
  `;
});

    window.dataOriginal = data;
  });

// Guardar cambios
function guardar() {

  const nuevosDatos = window.dataOriginal.map((item, index) => ({
    ...item,
    Precio_Kilo: document.getElementById(`kilo-${index}`).value,
    Precio_Mayor: document.getElementById(`mayor-${index}`).value
  }));

  fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: nuevosDatos })
  })
  .then(() => alert("Precios actualizados"));
}
