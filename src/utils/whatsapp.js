const numeroWhatsApp = (
  import.meta.env.VITE_WHATSAPP_NUMBER || ""
).replace(/\D/g, "");

export function abrirWhatsApp(mensaje) {
  console.log(import.meta.env.VITE_WHATSAPP_NUMBER);
  if (!numeroWhatsApp) {
    window.alert(
      "No se configuró el número de WhatsApp.",
    );
    return;
  }

  const texto = encodeURIComponent(mensaje);
  const url = `https://wa.me/${numeroWhatsApp}?text=${texto}`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer",
  );
}

export function cotizarProducto(producto) {
  const mensaje = `
Hola, Brilloplast. Quiero solicitar una cotización.

Código: ${producto.codigo}
Producto: ${producto.nombre}
Medida: ${producto.ancho} × ${producto.largo} cm
Grosor: ${producto.grosor}
Presentación: ${producto.presentacion}
Cantidad aproximada: 

Quedo atento a la cotización.
  `.trim();

  abrirWhatsApp(mensaje);
}

export function cotizarLista(productos) {
  if (!Array.isArray(productos) || productos.length === 0) {
    return;
  }

  const detalleProductos = productos
    .map((producto, indice) => {
      return `
${indice + 1}. ${producto.codigo} — ${producto.nombre}
Medida: ${producto.ancho} × ${producto.largo} cm
Grosor: ${producto.grosor}
Presentación: ${producto.presentacion}
Cantidad solicitada: ${producto.cantidad}
      `.trim();
    })
    .join("\n\n");

  const mensaje = `
Hola, Brilloplast. Quiero solicitar una cotización de los siguientes productos:

${detalleProductos}

¿Podrías indicarme el precio, disponibilidad y tiempo de entrega?

Quedo atento a tu respuesta.
  `.trim();

  abrirWhatsApp(mensaje);
}

export function cotizarPedidoPersonalizado(datos) {
  const mensaje = `
Hola, Brilloplast. Quiero cotizar una bolsa personalizada.

DATOS DEL CLIENTE
Nombre: ${datos.nombre}
Distrito o ubicación: ${datos.distrito}

CARACTERÍSTICAS DE LA BOLSA
Medida: ${datos.ancho} × ${datos.largo} cm
Grosor: ${datos.grosor}
Cantidad aproximada: ${datos.cantidad}
Uso de la bolsa: ${datos.uso}
Observaciones: ${datos.observaciones || "Ninguna"}

¿Podrías indicarme el precio y el tiempo aproximado de fabricación?

Quedo atento a tu respuesta.
  `.trim();

  abrirWhatsApp(mensaje);
}

