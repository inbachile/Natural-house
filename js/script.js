const filas = "ABCDEFGHIJK".split("");
const columnas = 21;
const sala = document.getElementById("sala");
const encabezado = document.getElementById("encabezado");
const seleccionados = new Set();
const seleccionadosDiv = document.getElementById("seleccionados");
const ocupados = []; // puedes agregar ["B5", "C10"] por ejemplo

// Crear encabezado de columnas de 21 a 1
for (let i = columnas; i >= 1; i--) {
    const numDiv = document.createElement("div");
    numDiv.className = "asiento";
    numDiv.textContent = i;
    encabezado.appendChild(numDiv);
}

// Crear filas
filas.forEach(fila => {
    const filaDiv = document.createElement("div");
    filaDiv.className = "fila";

    for (let col = columnas; col >= 1; col--) {
        const id = fila + col;
        const seat = document.createElement("div");
        seat.className = "asiento";
        seat.textContent = id;

        if (["A", "B", "C"].includes(fila)) seat.classList.add("vip");
        if (ocupados.includes(id)) {
            seat.classList.add("ocupado");
        } else {
            seat.onclick = () => {
                if (seat.classList.contains("ocupado")) return;

                if (seleccionados.has(id)) {
                    seleccionados.delete(id);
                    seat.style.backgroundColor = seat.classList.contains("vip") ? "gold" : "green";
                } else {
                    seleccionados.add(id);
                    seat.style.backgroundColor = "orange";
                }
                actualizarSeleccion();
            };
        }

        filaDiv.appendChild(seat);
    }

    sala.appendChild(filaDiv);
});

function actualizarSeleccion() {
    const lista = Array.from(seleccionados).sort();
    let total = 0;

    const detalles = lista.map(id => {
        const fila = id[0];
        const tipo = ["A", "B", "C"].includes(fila) ? "VIP" : "General";
        const precio = tipo === "VIP" ? 15000 : 10000;
        total += precio;
        return `${id} (${tipo} - $${precio})`;
    });

    seleccionadosDiv.innerHTML = lista.length
        ? `Asientos seleccionados:<br>${detalles.join("<br>")}<br><strong>Total: $${total}</strong>`
        : "Asientos seleccionados: ninguno";
}

function enviarReserva() {
    if (seleccionados.size === 0) {
        alert("Debes seleccionar al menos un asiento.");
        return;
    }

    let total = 0;
    const lista = Array.from(seleccionados).sort();
    const detalles = lista.map(id => {
        const fila = id[0];
        const tipo = ["A", "B", "C"].includes(fila) ? "VIP" : "General";
        const precio = tipo === "VIP" ? 15000 : 10000;
        total += precio;
        return `${id} (${tipo})`;
    });

    const mensaje = `Hola, quiero reservar los siguientes asientos para el evento INBA Chile 2025:\n${detalles.join(", ")}.\nTotal a pagar: $${total}. Por favor confirmar.`;
    const url = "https://wa.me/56961451122?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
}
