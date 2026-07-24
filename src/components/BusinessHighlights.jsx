const beneficios = [
  {
    numero: "01",
    titulo: "Venta mayor y menor",
    descripcion:
      "Opciones para negocios, comerciantes y compras en menores cantidades.",
  },
  {
    numero: "02",
    titulo: "Fabricación a medida",
    descripcion:
      "Solicita bolsas con medidas y características especiales.",
  },
  {
    numero: "03",
    titulo: "Atención directa",
    descripcion:
      "Cotiza los productos que necesitas directamente por WhatsApp.",
  },
];

export default function BusinessHighlights() {
  return (
    <section className="bg-emerald-950 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-8">
        {beneficios.map((beneficio) => (
          <article
            key={beneficio.numero}
            className="flex gap-4 rounded-2xl border border-emerald-800 bg-emerald-900/50 p-5"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500 font-black text-emerald-950">
              {beneficio.numero}
            </span>

            <div>
              <h2 className="font-bold">
                {beneficio.titulo}
              </h2>

              <p className="mt-1 text-sm leading-6 text-emerald-100">
                {beneficio.descripcion}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}