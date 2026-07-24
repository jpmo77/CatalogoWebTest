export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="scroll-mt-20 bg-gray-950 text-gray-300"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-emerald-600 text-xl font-black text-white">
              B
            </span>

            <strong className="text-xl tracking-wide text-white">
              BRILLOPLAST
            </strong>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
            Bolsas de polipropileno al por mayor y
            menor, con fabricación en medidas
            personalizadas.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-white">
            Navegación
          </h2>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              className="transition hover:text-white"
              href="#catalogo"
            >
              Catálogo
            </a>

            <a
              className="transition hover:text-white"
              href="#como-comprar"
            >
              Cómo comprar
            </a>

            <a
              className="transition hover:text-white"
              href="#personalizada"
            >
              Bolsas a medida
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-white">
            Encuéntranos
          </h2>

          <p className="mt-4 text-sm leading-6">
            Centro Comercial 3 de Febrero
          </p>

          <p className="mt-1 text-sm text-gray-400">
            La Victoria, Lima
          </p>

          <p className="mt-3 text-sm text-gray-400">
            Atención de 8:00 a. m. a 7:00 p. m.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-white">
            Medios de pago
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-400">
            Efectivo, Yape, Plin y transferencias
            bancarias.
          </p>

          <a
            href="#personalizada"
            className="mt-4 inline-flex text-sm font-bold text-emerald-400 transition hover:text-emerald-300"
          >
            Solicitar una cotización →
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {anioActual} Brilloplast. Todos los
            derechos reservados.
          </p>

          <p>
            Catálogo digital de productos
          </p>
        </div>
      </div>
    </footer>
  );
}