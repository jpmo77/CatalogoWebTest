import { cotizarProducto } from "../utils/whatsapp.js";
import ProductImage from "./ProductImage.jsx";

export default function ProductCard({
  producto,
  agregarACotizacion,
  abrirDetalleProducto,
  estaEnCotizacion,
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition md:hover:-translate-y-1 md:hover:shadow-lg">
      <div className="relative grid aspect-4/3 place-items-center overflow-hidden bg-gray-50 p-4 sm:aspect-square sm:p-5">
        {producto.destacado && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
            Más vendido
          </span>
        )}

        {estaEnCotizacion && (
          <span className="absolute right-3 top-3 rounded-full bg-gray-950 px-3 py-1 text-xs font-bold text-white">
            En tu lista
          </span>
        )}

        <ProductImage
          src={producto.imagen}
          alt={`${producto.nombre}, medida ${producto.ancho} por ${producto.largo} pulgadas`}
          className="h-full w-full object-contain transition duration-300 md:group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {producto.codigo}
        </p>

        <h3 className="mt-1 font-bold text-gray-950">
          {producto.nombre}
        </h3>

        <p className="mt-2 text-xl font-black text-emerald-700">
          {producto.ancho} × {producto.largo} in
        </p>

        <dl className="mt-3 space-y-1 text-sm text-gray-600">
          <div className="flex justify-between gap-3">
            <dt>Grosor</dt>

            <dd className="font-medium text-gray-800">
              {producto.grosor}
            </dd>
          </div>

          <div className="flex justify-between gap-3">
            <dt>Presentación</dt>

            <dd className="text-right font-medium text-gray-800">
              {producto.presentacion}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() =>
                abrirDetalleProducto(producto)
              }
              className="min-h-11 rounded-xl border border-gray-300 px-3 py-2.5 text-sm font-bold text-gray-800 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 active:scale-[0.98]"
            >
              Ver detalles
            </button>

            <button
              type="button"
              onClick={() =>
                agregarACotizacion(producto)
              }
              className="min-h-11 rounded-xl bg-gray-950 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800 active:scale-[0.98]"
            >
              {estaEnCotizacion
                ? "Agregar otra"
                : "Agregar"}
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              cotizarProducto(producto)
            }
            className="mt-2 min-h-11 w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            Consultar por WhatsApp
          </button>
        </div>
      </div>
    </article>
  );
}