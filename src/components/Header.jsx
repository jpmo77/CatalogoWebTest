export default function Header({
  cantidadProductos = 0,
}) {
  const tieneProductos =
    cantidadProductos > 0;

  const destinoCotizacion = tieneProductos
    ? "#cotizacion"
    : "#catalogo";

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 lg:px-8">
        <a
          href="#inicio"
          className="flex min-w-0 items-center gap-3"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-600 text-xl font-black text-white sm:size-11">
            B
          </span>

          <span className="min-w-0">
            <strong className="block truncate text-sm leading-none tracking-wide text-gray-950 sm:text-base">
              BRILLOPLAST
            </strong>

            <small className="mt-1 hidden text-xs text-gray-500 sm:block">
              Bolsas de polipropileno
            </small>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          <a
            className="transition hover:text-emerald-700"
            href="#catalogo"
          >
            Catálogo
          </a>

          <a
            className="transition hover:text-emerald-700"
            href="#como-comprar"
          >
            Cómo comprar
          </a>

          <a
            className="transition hover:text-emerald-700"
            href="#personalizada"
          >
            Bolsas a medida
          </a>

          <a
            className="transition hover:text-emerald-700"
            href="#contacto"
          >
            Contacto
          </a>
        </nav>

        <a
          href={destinoCotizacion}
          aria-label={
            tieneProductos
              ? `Ver cotización con ${cantidadProductos} productos`
              : "Ir al catálogo"
          }
          className="flex shrink-0 items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:px-4"
        >
          <span className="sm:hidden">
            {tieneProductos
              ? "Lista"
              : "Cotizar"}
          </span>

          <span className="hidden sm:inline">
            {tieneProductos
              ? "Cotización"
              : "Cotizar"}
          </span>

          {tieneProductos && (
            <span className="grid min-w-6 place-items-center rounded-full bg-white px-1.5 py-0.5 text-xs font-black text-emerald-700">
              {cantidadProductos}
            </span>
          )}
        </a>
      </div>
    </header>
  );
}