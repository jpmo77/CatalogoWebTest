const pasos = [
  {
    numero: "1",
    titulo: "Explora el catálogo",
    descripcion:
      "Busca los productos por medida, grosor o color.",
  },
  {
    numero: "2",
    titulo: "Agrega tus productos",
    descripcion:
      "Selecciona los productos y las cantidades que necesitas.",
  },
  {
    numero: "3",
    titulo: "Envía tu cotización",
    descripcion:
      "La lista se enviará directamente por WhatsApp.",
  },
  {
    numero: "4",
    titulo: "Coordina tu pedido",
    descripcion:
      "Confirma precios, disponibilidad y demás detalles con Brilloplast.",
  },
];

export default function HowToBuy() {
  return (
    <section
      id="como-comprar"
      className="scroll-mt-20 bg-white py-16"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Proceso de compra
          </p>

          <h2 className="mt-2 text-3xl font-black text-gray-950 sm:text-4xl">
            Cotiza en cuatro pasos
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            El catálogo prepara tu solicitud para
            que puedas enviarla directamente por
            WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso) => (
            <article
              key={paso.numero}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
            >
              <span className="grid size-10 place-items-center rounded-full bg-emerald-600 font-black text-white">
                {paso.numero}
              </span>

              <h3 className="mt-5 font-bold text-gray-950">
                {paso.titulo}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {paso.descripcion}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 rounded-3xl bg-emerald-50 p-6 sm:p-8 lg:grid-cols-3">
          <div>
            <p className="text-sm font-bold text-emerald-700">
              Ubicación
            </p>

            <p className="mt-2 font-semibold text-gray-950">
              Centro Comercial 3 de Febrero
            </p>

            <p className="mt-1 text-sm text-gray-600">
              La Victoria, Lima
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-emerald-700">
              Horario de atención
            </p>

            <p className="mt-2 font-semibold text-gray-950">
              De 8:00 a. m. a 7:00 p. m.
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Días de atención por confirmar
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-emerald-700">
              Medios de pago
            </p>

            <p className="mt-2 font-semibold text-gray-950">
              Efectivo, Yape, Plin y transferencias
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Confirma los datos antes de realizar
              el pago.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}