export default function Hero() {
  return (
    <section
      id="inicio"
      className="scroll-mt-20 overflow-hidden bg-white"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Brilloplast · La Victoria
          </p>

          <h1 className="max-w-xl text-4xl font-black tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Bolsas de polipropileno para tu negocio
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Venta al por mayor y menor en diferentes
            medidas y grosores. También fabricamos
            bolsas personalizadas según lo que
            necesites.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#catalogo"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Ver catálogo
            </a>

            <a
              href="#personalizada"
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-center font-semibold text-gray-800 transition hover:border-emerald-600 hover:text-emerald-700"
            >
              Solicitar medida personalizada
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              Venta mayor y menor
            </span>

            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              Fabricación a medida
            </span>

            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              Atención directa
            </span>
          </div>
        </div>

        <div className="relative min-h-72 rounded-4xl bg-linear-to-br from-emerald-50 to-gray-100 p-6 sm:min-h-80 sm:p-8">
          <div className="absolute inset-x-10 bottom-6 top-6 rotate-6 rounded-4xl border border-white/80 bg-white/70 shadow-xl backdrop-blur-sm sm:inset-x-12" />

          <div className="absolute inset-x-16 bottom-10 top-10 -rotate-6 rounded-4xl border border-white/80 bg-white/60 shadow-lg backdrop-blur-sm sm:inset-x-20" />

          <div className="relative grid h-full min-h-64 place-items-center sm:min-h-72">
            <img
              src="/productos/bolsa-transparente.svg"
              alt="Bolsa transparente fabricada por Brilloplast"
              className="h-56 w-56 object-contain drop-shadow-xl sm:h-72 sm:w-72"
            />
          </div>

          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-lg backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Fabricación personalizada
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              Elige la medida, grosor y cantidad
              que necesita tu negocio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}