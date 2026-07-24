const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100";

export default function ProductFilters({
  filtros,
  setFiltros,
  opciones,
  cantidadFiltrosActivos,
  cantidadResultados = 0,
  limpiarFiltros,
  modoMovil = false,
  cerrarFiltros,
}) {
  function actualizar(campo, valor) {
    setFiltros((actuales) => ({
      ...actuales,
      [campo]: valor,
    }));
  }

  return (
    <aside
      role={modoMovil ? "dialog" : undefined}
      aria-modal={modoMovil ? "true" : undefined}
      aria-labelledby={
        modoMovil
          ? "titulo-filtros-moviles"
          : undefined
      }
      className={
        modoMovil
          ? "flex h-full flex-col bg-white shadow-2xl"
          : "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:self-start"
      }
    >
      <div
        className={
          modoMovil
            ? "flex items-center justify-between border-b border-gray-200 p-5"
            : "mb-5 flex items-center justify-between"
        }
      >
        <div className="flex items-center gap-2">
          <h2
            id={
              modoMovil
                ? "titulo-filtros-moviles"
                : undefined
            }
            className="text-lg font-bold"
          >
            Filtros
          </h2>

          {cantidadFiltrosActivos > 0 && (
            <span className="grid min-w-6 place-items-center rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-black text-emerald-700">
              {cantidadFiltrosActivos}
            </span>
          )}
        </div>

        {modoMovil ? (
          <button
            type="button"
            onClick={cerrarFiltros}
            aria-label="Cerrar filtros"
            className="grid size-10 place-items-center rounded-full bg-gray-100 text-xl font-bold text-gray-700 transition hover:bg-gray-200"
          >
            ×
          </button>
        ) : (
          <span aria-hidden="true">☰</span>
        )}
      </div>

      <div
        className={
          modoMovil
            ? "flex-1 space-y-5 overflow-y-auto p-5"
            : "space-y-5"
        }
      >
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            Buscar
          </span>

          <input
            className={inputClass}
            type="search"
            placeholder="Código, nombre o medida"
            value={filtros.busqueda}
            onChange={(event) =>
              actualizar(
                "busqueda",
                event.target.value,
              )
            }
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="mb-2 block text-sm font-semibold">
              Ancho
            </span>

            <select
              className={inputClass}
              value={filtros.ancho}
              onChange={(event) =>
                actualizar(
                  "ancho",
                  event.target.value,
                )
              }
            >
              <option value="">Todos</option>

              {opciones.anchos.map((ancho) => (
                <option key={ancho} value={ancho}>
                  {ancho} cm
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Largo
            </span>

            <select
              className={inputClass}
              value={filtros.largo}
              onChange={(event) =>
                actualizar(
                  "largo",
                  event.target.value,
                )
              }
            >
              <option value="">Todos</option>

              {opciones.largos.map((largo) => (
                <option key={largo} value={largo}>
                  {largo} cm
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            Grosor
          </span>

          <select
            className={inputClass}
            value={filtros.grosor}
            onChange={(event) =>
              actualizar(
                "grosor",
                event.target.value,
              )
            }
          >
            <option value="">Todos</option>

            {opciones.grosores.map((grosor) => (
              <option key={grosor} value={grosor}>
                {grosor}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            Color
          </span>

          <select
            className={inputClass}
            value={filtros.color}
            onChange={(event) =>
              actualizar(
                "color",
                event.target.value,
              )
            }
          >
            <option value="">Todos</option>

            {opciones.colores.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-emerald-50 p-3">
          <input
            type="checkbox"
            className="h-4 w-4 accent-emerald-600"
            checked={filtros.soloDestacados}
            onChange={(event) =>
              actualizar(
                "soloDestacados",
                event.target.checked,
              )
            }
          />

          <span className="text-sm font-semibold text-emerald-900">
            Mostrar solo destacados
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            Ordenar productos
          </span>

          <select
            className={inputClass}
            value={filtros.orden}
            onChange={(event) =>
              actualizar(
                "orden",
                event.target.value,
              )
            }
          >
            <option value="medida-asc">
              Medida: menor a mayor
            </option>

            <option value="medida-desc">
              Medida: mayor a menor
            </option>

            <option value="codigo-asc">
              Código: A–Z
            </option>

            <option value="nombre-asc">
              Nombre: A–Z
            </option>
          </select>
        </label>

        <button
          type="button"
          disabled={cantidadFiltrosActivos === 0}
          className="w-full rounded-xl border border-emerald-600 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent"
          onClick={limpiarFiltros}
        >
          Limpiar filtros
        </button>
      </div>

      {modoMovil && (
        <div className="border-t border-gray-200 bg-white p-4">
          <button
            type="button"
            onClick={cerrarFiltros}
            className="w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-black text-white transition hover:bg-emerald-700"
          >
            Ver {cantidadResultados}{" "}
            {cantidadResultados === 1
              ? "producto"
              : "productos"}
          </button>
        </div>
      )}
    </aside>
  );
}