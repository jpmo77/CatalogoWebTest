import { cotizarLista } from "../utils/whatsapp.js";
import ProductImage from "./ProductImage.jsx";

export default function QuoteList({
  productos,
  actualizarCantidad,
  eliminarProducto,
  vaciarCotizacion,
}) {
  if (productos.length === 0) {
    return null;
  }

  const cantidadTotal = productos.reduce(
    (total, producto) =>
      total + (Number(producto.cantidad) || 0),
    0,
  );

  function disminuirCantidad(producto) {
    actualizarCantidad(
      producto.id,
      Math.max(1, producto.cantidad - 1),
    );
  }

  function aumentarCantidad(producto) {
    actualizarCantidad(
      producto.id,
      producto.cantidad + 1,
    );
  }

  return (
    <section
      id="cotizacion"
      className="scroll-mt-20 bg-emerald-950 py-16 pb-24 text-white md:pb-16"
    >
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
              Tu solicitud
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Lista de cotización
            </h2>

            <p className="mt-3 text-sm text-emerald-100">
              {productos.length}{" "}
              {productos.length === 1
                ? "producto diferente"
                : "productos diferentes"}{" "}
              · {cantidadTotal} de cantidad total
            </p>
          </div>

          <button
            type="button"
            onClick={vaciarCotizacion}
            className="w-full rounded-xl border border-emerald-400 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-900 sm:w-auto"
          >
            Vaciar lista
          </button>
        </div>

        <div className="space-y-4">
          {productos.map((producto) => (
            <article
              key={producto.id}
              className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-2xl bg-white p-4 text-gray-900 shadow-sm sm:grid-cols-[80px_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
            >
              <ProductImage
                src={producto.imagen}
                alt={producto.nombre}
                className="size-18 rounded-xl bg-gray-50 object-contain p-2 sm:size-20"
              />

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {producto.codigo}
                </p>

                <h3 className="mt-1 font-bold">
                  {producto.nombre}
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  {producto.ancho} ×{" "}
                  {producto.largo} cm ·{" "}
                  {producto.grosor}
                </p>

                <p className="text-sm text-gray-600">
                  {producto.presentacion}
                </p>
              </div>

              <div className="col-span-2 flex items-end justify-between gap-3 border-t border-gray-100 pt-3 sm:col-span-1 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                <div>
                  <span className="mb-1 block text-xs font-semibold text-gray-500">
                    Cantidad
                  </span>

                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        disminuirCantidad(producto)
                      }
                      aria-label={`Disminuir cantidad de ${producto.nombre}`}
                      className="grid size-11 place-items-center rounded-l-xl border border-gray-300 text-lg font-bold text-gray-700 transition hover:bg-gray-100"
                    >
                      −
                    </button>

                    <input
                      type="number"
                      inputMode="numeric"
                      min="1"
                      value={producto.cantidad}
                      aria-label={`Cantidad de ${producto.nombre}`}
                      onChange={(event) =>
                        actualizarCantidad(
                          producto.id,
                          event.target.value,
                        )
                      }
                      className="h-11 w-16 border-y border-gray-300 px-2 text-center font-bold outline-none focus:border-emerald-600 sm:w-20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        aumentarCantidad(producto)
                      }
                      aria-label={`Aumentar cantidad de ${producto.nombre}`}
                      className="grid size-11 place-items-center rounded-r-xl border border-gray-300 text-lg font-bold text-gray-700 transition hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    eliminarProducto(producto.id)
                  }
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-emerald-900 p-5 sm:p-6">
          <h3 className="text-lg font-bold">
            Solicitar cotización
          </h3>

          <p className="mt-2 text-sm leading-6 text-emerald-100">
            Se abrirá WhatsApp con los productos y
            las cantidades que seleccionaste.
          </p>

          <button
            type="button"
            onClick={() => cotizarLista(productos)}
            className="mt-4 min-h-12 w-full rounded-xl bg-green-500 px-5 py-3 font-black text-white transition hover:bg-green-400 active:scale-[0.99]"
          >
            Enviar lista por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}