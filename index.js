/**
 * Función para abrir el modal de forma manual usando la API de Bootstrap
 */
function abrirModalCatalogo() {
    const modalElement = document.getElementById('modalCatalogo');

    if (modalElement) {
        let modal = bootstrap.Modal.getInstance(modalElement);
        if (!modal) {
            modal = new bootstrap.Modal(modalElement);
        }

        modal.show();

        // 🔥 CARGAR DATOS AL ABRIR EL MODAL
        cargarCatalogo();

    } else {
        console.error('Error: No se encontró el elemento con ID "modalCatalogo"');
    }
}


/**
 * 🔥 FUNCIÓN NUEVA: Cargar datos desde SheetDB
 */
function cargarCatalogo() {

    fetch("https://sheetdb.io/api/v1/xtlc7zhz4mbtp") // ← pega aquí tu link real
        .then(res => res.json())
        .then(data => {

            const tabla = document.getElementById("tabla-huevos");
            const otros = document.getElementById("otros-productos");

            if (!tabla || !otros) {
                console.error("No se encontraron los contenedores");
                return;
            }

            tabla.innerHTML = "";
            otros.innerHTML = "";

            data.forEach(item => {

                // 🥚 HUEVOS
                if (item.Categoria === "huevos") {
                    tabla.innerHTML += `
                        <tr class="border-bottom">
                            <td class="py-3 fw-bold">${item.Producto}</td>
                            <td class="text-center text-muted">S/ ${item.Precio_Kilo}</td>
                            <td class="text-center fw-bold text-success">S/ ${item.Precio_Mayor}</td>
                        </tr>
                    `;
                }

                // 🥫 OTROS
                if (item.Categoria === "otros") {
                    otros.innerHTML += `
                        <div class="col-6">
                            <div class="p-3 rounded-4 shadow-sm bg-white border border-light">
                                <h6 class="mb-1 fw-bold">${item.Producto}</h6>
                                <span class="text-success fw-bold">S/ ${item.Precio_Kilo}</span>
                                <small class="text-muted">c/u</small>
                            </div>
                        </div>
                    `;
                }

            });

        })
        .catch(error => console.error("Error al cargar datos:", error));
}


/**
 * Inicialización de eventos al cargar el DOM
 */
document.addEventListener('DOMContentLoaded', function() {
    
    const btnHero = document.getElementById('btnHeroCatalogo');
    
    if (btnHero) {
        btnHero.style.pointerEvents = 'auto';
        
        btnHero.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            abrirModalCatalogo();
        });
    }
});


/**
 * Service Worker
 */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("SW registrado"));
}