import { useEffect, useState } from "react";
import ProductImage from "./ProductImage.jsx";

export default function ProductModal({
  producto,
  cerrarModal,
  agregarACotizacion,
}) {
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    setCantidad(1);
  }, [producto]);

  useEffect(() => {
    if (!producto) {
      return undefined;
    }

    function cerrarConEscape(event) {
      if (event.key === "Escape") {
        cerrarModal();
      }
    }

    const overflowAnterior =
      document.body.style.overflow;

    document.addEventListener(
      "keydown",
      cerrarConEscape,
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        cerrarConEscape,
      );

      document.body.style.overflow =
        overflowAnterior;
    };
  }, [producto, cerrarModal]);

  if (!producto) {
    return null;
  }

  function cambiarCantidad(valor) {
    const cantidadConvertida = Math.max(
      1,
      Number(valor) || 1,
    );

    setCantidad(cantidadConvertida);
  }

  function disminuirCantidad() {
    setCantidad((cantidadActual) =>
      Math.max(1, cantidadActual - 1),
    );
  }

  function aumentarCantidad() {
    setCantidad(
      (cantidadActual) => cantidadActual + 1,
    );
  }

  function agregarProducto() {
    agregarACotizacion(producto, cantidad);
    cerrarModal();
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-gray-950/70 backdrop-blur-sm sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          cerrarModal();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-producto"
        aria-describedby="descripcion-producto"
        className="relative h-dvh max-h-dvh w-full overflow-y-auto overscroll-contain bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-3xl"
      >
        <div className="sticky top-0 z-20 flex h-0 justify-end">
          <button
            type="button"
            onClick={cerrarModal}
            aria-label="Cerrar detalle del producto"
            className="mr-4 mt-4 grid size-11 place-items-center rounded-full bg-white text-xl font-bold text-gray-700 shadow-md transition hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="grid h-60 place-items-center bg-gray-50 p-5 sm:h-72 sm:p-8 md:h-auto md:min-h-full">
            <ProductImage
              src={producto.imagen}
              alt={`${producto.nombre}, medida ${producto.ancho} por ${producto.largo} centímetros`}
              loading="eager"
              className="max-h-125 h-full w-full object-contain"
            />
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-600">
                {producto.codigo}
              </span>

              {producto.destacado && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  Más vendido
                </span>
              )}
            </div>

            <h2
              id="titulo-producto"
              className="mt-4 pr-10 text-2xl font-black text-gray-950 sm:mt-5 sm:text-3xl"
            >
              {producto.nombre}
            </h2>

            <p
              id="descripcion-producto"
              className="mt-2 text-2xl font-black text-emerald-700 sm:mt-3 sm:text-3xl"
            >
              {producto.ancho} ×{" "}
              {producto.largo} cm
            </p>

            <dl className="mt-5 divide-y divide-gray-200 rounded-2xl border border-gray-200 sm:mt-7">
              <div className="flex justify-between gap-4 p-3 sm:p-4">
                <dt className="text-sm text-gray-500">
                  Código
                </dt>

                <dd className="text-right text-sm font-bold text-gray-900">
                  {producto.codigo}
                </dd>
              </div>

              <div className="flex justify-between gap-4 p-3 sm:p-4">
                <dt className="text-sm text-gray-500">
                  Ancho
                </dt>

                <dd className="text-right text-sm font-bold text-gray-900">
                  {producto.ancho} cm
                </dd>
              </div>

              <div className="flex justify-between gap-4 p-3 sm:p-4">
                <dt className="text-sm text-gray-500">
                  Largo
                </dt>

                <dd className="text-right text-sm font-bold text-gray-900">
                  {producto.largo} cm
                </dd>
              </div>

              <div className="flex justify-between gap-4 p-3 sm:p-4">
                <dt className="text-sm text-gray-500">
                  Grosor
                </dt>

                <dd className="text-right text-sm font-bold text-gray-900">
                  {producto.grosor}
                </dd>
              </div>

              {producto.color && (
                <div className="flex justify-between gap-4 p-3 sm:p-4">
                  <dt className="text-sm text-gray-500">
                    Color
                  </dt>

                  <dd className="text-right text-sm font-bold text-gray-900">
                    {producto.color}
                  </dd>
                </div>
              )}

              <div className="flex justify-between gap-4 p-3 sm:p-4">
                <dt className="text-sm text-gray-500">
                  Presentación
                </dt>

                <dd className="max-w-52 text-right text-sm font-bold text-gray-900">
                  {producto.presentacion}
                </dd>
              </div>
            </dl>

            <div className="mt-6 sm:mt-7">
              <span className="block text-sm font-bold text-gray-700">
                Cantidad solicitada
              </span>

              <div className="mt-2 grid grid-cols-[48px_minmax(0,1fr)_48px] items-center">
                <button
                  type="button"
                  onClick={disminuirCantidad}
                  className="grid size-12 place-items-center rounded-l-xl border border-gray-300 text-xl font-bold text-gray-700 transition hover:bg-gray-100"
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>

                <input
                  type="number"
                  inputMode="numeric"
                  min="1"
                  value={cantidad}
                  onChange={(event) =>
                    cambiarCantidad(
                      event.target.value,
                    )
                  }
                  className="h-12 w-full border-y border-gray-300 px-3 text-center font-bold outline-none focus:border-emerald-600"
                  aria-label="Cantidad solicitada"
                />

                <button
                  type="button"
                  onClick={aumentarCantidad}
                  className="grid size-12 place-items-center rounded-r-xl border border-gray-300 text-xl font-bold text-gray-700 transition hover:bg-gray-100"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 -mx-5 mt-7 border-t border-gray-200 bg-white p-5 sm:static sm:mx-0 sm:border-0 sm:p-0">
              <button
                type="button"
                onClick={agregarProducto}
                className="w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-black text-white transition hover:bg-emerald-700 active:scale-[0.99]"
              >
                Agregar {cantidad} a la cotización
              </button>

              <p className="mt-3 text-center text-xs text-gray-500">
                Podrás modificar la cantidad antes
                de enviar la cotización.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}