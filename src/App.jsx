import { useEffect, useMemo, useState, useRef } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ProductFilters from "./components/ProductFilters.jsx";
import ProductCard from "./components/ProductCard.jsx";
import CustomQuoteForm from "./components/CustomQuoteForm.jsx";
import Footer from "./components/Footer.jsx";
import productos from "./data/productos.json";
import QuoteList from "./components/QuoteList.jsx";
import Toast from "./components/Toast.jsx";
import ProductModal from "./components/ProductModal.jsx";
import BusinessHighlights from "./components/BusinessHighlights.jsx";
import HowToBuy from "./components/HowToBuy.jsx";
import BusinessSchema from "./components/BusinessSchema.jsx";

const filtrosIniciales = {
  busqueda: "",
  ancho: "",
  largo: "",
  grosor: "",
  color: "",
  soloDestacados: false,
  orden: "medida-asc"
};

const PRODUCTOS_INICIALES = 9;
const PRODUCTOS_POR_CARGA = 9;

const COTIZACION_STORAGE_KEY =
  "brilloplast-cotizacion";

function normalizar(texto) {
  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function App() {
  const [filtros, setFiltros] = useState(filtrosIniciales);

  const [cotizacion, setCotizacion] = useState(() => {
    try {
      const cotizacionGuardada = localStorage.getItem(
        COTIZACION_STORAGE_KEY,
      );

      if (!cotizacionGuardada) {
        return [];
      }

      const productosGuardados = JSON.parse(cotizacionGuardada);

      return Array.isArray(productosGuardados)
        ? productosGuardados
        : [];
    } catch (error) {
      console.error(
        "No se pudo recuperar la cotización:",
        error,
      );

      return [];
    }
  });

  const [notificacion, setNotificacion] = useState("");
  const notificacionTimeoutRef = useRef(null);

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [cantidadVisible, setCantidadVisible] = useState(PRODUCTOS_INICIALES,);

  const [filtrosMovilAbiertos, setFiltrosMovilAbiertos,] = useState(false);

  useEffect(() => {
    setCantidadVisible(PRODUCTOS_INICIALES);
  }, [filtros]);

  useEffect(() => {
    try {
      localStorage.setItem(
        COTIZACION_STORAGE_KEY,
        JSON.stringify(cotizacion),
      );
    } catch (error) {
      console.error(
        "No se pudo guardar la cotización:",
        error,
      );
    }
  }, [cotizacion]);

  useEffect(() => {
    return () => {
      if (notificacionTimeoutRef.current) {
        clearTimeout(notificacionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!filtrosMovilAbiertos) {
      return undefined;
    }

    function cerrarConEscape(event) {
      if (event.key === "Escape") {
        setFiltrosMovilAbiertos(false);
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
  }, [filtrosMovilAbiertos]);

  const opcionesFiltros = useMemo(() => {
    const anchos = [
      ...new Set(productos.map((producto) => producto.ancho)),
    ].sort((a, b) => a - b);

    const largos = [
      ...new Set(productos.map((producto) => producto.largo)),
    ].sort((a, b) => a - b);

    const grosores = [
      ...new Set(
        productos
          .map((producto) => producto.grosor)
          .filter(Boolean),
      ),
    ].sort((a, b) => a.localeCompare(b, "es"));

    const colores = [
      ...new Set(
        productos
          .map((producto) => producto.color)
          .filter(Boolean),
      ),
    ].sort((a, b) => a.localeCompare(b, "es"));

    return {
      anchos,
      largos,
      grosores,
      colores,
    };
  }, []);

  const cantidadFiltrosActivos = useMemo(() => {
    return Object.entries(filtros).filter(
      ([campo, valor]) => {
        if (campo === "orden") {
          return false;
        }

        if (typeof valor === "boolean") {
          return valor;
        }

        return valor !== "";
      },
    ).length;
  }, [filtros]);

  const productosFiltrados = useMemo(() => {
    const textoBuscado = normalizar(filtros.busqueda);

    const resultados = productos.filter((producto) => {
      const textoProducto = normalizar(`
      ${producto.codigo}
      ${producto.nombre}
      ${producto.ancho}x${producto.largo}
      ${producto.ancho} x ${producto.largo}
      ${producto.grosor}
      ${producto.color}
      ${producto.presentacion}
    `);

      const coincideBusqueda =
        !textoBuscado ||
        textoProducto.includes(textoBuscado);

      const coincideAncho =
        !filtros.ancho ||
        producto.ancho === Number(filtros.ancho);

      const coincideLargo =
        !filtros.largo ||
        producto.largo === Number(filtros.largo);

      const coincideGrosor =
        !filtros.grosor ||
        producto.grosor === filtros.grosor;

      const coincideColor =
        !filtros.color ||
        producto.color === filtros.color;

      const coincideDestacado =
        !filtros.soloDestacados ||
        producto.destacado === true;

      return (
        coincideBusqueda &&
        coincideAncho &&
        coincideLargo &&
        coincideGrosor &&
        coincideColor &&
        coincideDestacado
      );
    });

    return resultados.sort((productoA, productoB) => {
      switch (filtros.orden) {
        case "medida-desc":
          return (
            productoB.ancho - productoA.ancho ||
            productoB.largo - productoA.largo
          );

        case "codigo-asc":
          return productoA.codigo.localeCompare(
            productoB.codigo,
            "es",
            {
              numeric: true,
            },
          );

        case "nombre-asc":
          return productoA.nombre.localeCompare(
            productoB.nombre,
            "es",
          );

        case "medida-asc":
        default:
          return (
            productoA.ancho - productoB.ancho ||
            productoA.largo - productoB.largo
          );
      }
    });
  }, [filtros]);

  const productosVisibles = useMemo(() => {
    return productosFiltrados.slice(0, cantidadVisible);
  }, [productosFiltrados, cantidadVisible]);

  const quedanProductos = productosVisibles.length < productosFiltrados.length;
  const productosRestantes = productosFiltrados.length - productosVisibles.length;

  function mostrarNotificacion(mensaje) {
    setNotificacion(mensaje);

    if (notificacionTimeoutRef.current) {
      clearTimeout(notificacionTimeoutRef.current);
    }

    notificacionTimeoutRef.current = setTimeout(() => {
      setNotificacion("");
      notificacionTimeoutRef.current = null;
    }, 2500);
  }

  function agregarACotizacion(
    productoSeleccionado,
    cantidadSeleccionada = 1,
  ) {
    const cantidadConvertida = Math.max(
      1,
      Number(cantidadSeleccionada) || 1,
    );

    setCotizacion((productosActuales) => {
      const productoExistente = productosActuales.find(
        (producto) =>
          producto.id === productoSeleccionado.id,
      );

      if (productoExistente) {
        return productosActuales.map((producto) =>
          producto.id === productoSeleccionado.id
            ? {
              ...producto,
              cantidad:
                producto.cantidad + cantidadConvertida,
            }
            : producto,
        );
      }

      return [
        ...productosActuales,
        {
          ...productoSeleccionado,
          cantidad: cantidadConvertida,
        },
      ];
    });

    mostrarNotificacion(
      `${productoSeleccionado.codigo}: ${cantidadConvertida} agregado a tu cotización.`,
    );
  }

  function actualizarCantidad(productoId, nuevaCantidad) {
    const cantidadConvertida = Math.max(
      1,
      Number(nuevaCantidad) || 1,
    );

    setCotizacion((productosActuales) =>
      productosActuales.map((producto) =>
        producto.id === productoId
          ? {
            ...producto,
            cantidad: cantidadConvertida,
          }
          : producto,
      ),
    );
  }

  function eliminarProducto(productoId) {
    setCotizacion((productosActuales) =>
      productosActuales.filter(
        (producto) => producto.id !== productoId,
      ),
    );
  }

  function vaciarCotizacion() {
    setCotizacion([]);
  }

  function abrirDetalleProducto(producto) {
    setProductoSeleccionado(producto);
  }

  function cerrarDetalleProducto() {
    setProductoSeleccionado(null);
  }

  function verMasProductos() {
    setCantidadVisible(
      (cantidadActual) =>
        cantidadActual + PRODUCTOS_POR_CARGA,
    );
  }

  return (
    <>
    <BusinessSchema />
      <Header cantidadProductos={cotizacion.length} />
      <main>
        <Hero />

        <BusinessHighlights />

        <section id="catalogo" className="py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
                  Productos
                </p>
                <h2 className="mt-2 text-3xl font-black text-gray-950 sm:text-4xl">
                  Encuentra tu medida
                </h2>
              </div>
              <div className="text-sm text-gray-600">
                Mostrando{" "}
                <span className="font-bold text-gray-900">
                  {productosVisibles.length}
                </span>{" "}
                de{" "}
                <span className="font-bold text-gray-900">
                  {productosFiltrados.length}
                </span>{" "}
                {productosFiltrados.length === 1
                  ? "producto encontrado"
                  : "productos encontrados"}

                {cantidadFiltrosActivos > 0 && (
                  <span>
                    {" "}
                    · {productos.length} disponibles en total
                  </span>
                )}
              </div>
            </div>

            <div className="mb-5 lg:hidden">
              <button
                type="button"
                aria-expanded={filtrosMovilAbiertos}
                aria-controls="panel-filtros-movil"
                onClick={() =>
                  setFiltrosMovilAbiertos(true)
                }
                className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3.5 font-bold text-gray-900 shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true">☰</span>
                  Filtros

                  {cantidadFiltrosActivos > 0 && (
                    <span className="grid min-w-6 place-items-center rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-black text-emerald-700">
                      {cantidadFiltrosActivos}
                    </span>
                  )}
                </span>

                <span className="text-sm font-semibold text-emerald-700">
                  Abrir
                </span>
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
                <ProductFilters
                  filtros={filtros}
                  setFiltros={setFiltros}
                  opciones={opcionesFiltros}
                  cantidadFiltrosActivos={
                    cantidadFiltrosActivos
                  }
                  limpiarFiltros={() =>
                    setFiltros(filtrosIniciales)
                  }
                />
              </div>

              <div className="min-w-0">
                {productosFiltrados.length > 0 ? (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {productosVisibles.map((producto) => (
                        <ProductCard
                          key={producto.id}
                          producto={producto}
                          agregarACotizacion={
                            agregarACotizacion
                          }
                          abrirDetalleProducto={
                            abrirDetalleProducto
                          }
                          estaEnCotizacion={cotizacion.some(
                            (item) =>
                              item.id === producto.id,
                          )}
                        />
                      ))}
                    </div>

                    {quedanProductos && (
                      <div className="mt-10 text-center">
                        <button
                          type="button"
                          onClick={verMasProductos}
                          className="rounded-xl border border-emerald-600 bg-white px-7 py-3 font-bold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
                        >
                          Ver{" "}
                          {Math.min(
                            PRODUCTOS_POR_CARGA,
                            productosRestantes,
                          )}{" "}
                          productos más
                        </button>

                        <p className="mt-3 text-sm text-gray-500">
                          Quedan {productosRestantes} por
                          mostrar
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                    <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-3xl">
                      🔍
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-gray-950">
                      No encontramos esa medida
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-gray-600">
                      Prueba con otros filtros o solicita una
                      bolsa personalizada con las medidas que
                      necesitas.
                    </p>

                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() =>
                          setFiltros(filtrosIniciales)
                        }
                        className="rounded-xl border border-emerald-600 px-5 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                      >
                        Limpiar filtros
                      </button>

                      <a
                        href="#personalizada"
                        className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Solicitar medida personalizada
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>



          </div>
        </section>

        {filtrosMovilAbiertos && (
          <div
            className="fixed inset-0 z-50 bg-gray-950/60 lg:hidden"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setFiltrosMovilAbiertos(false);
              }
            }}
          >
            <div
              id="panel-filtros-movil"
              className="ml-auto h-full w-full max-w-sm"
            >
              <ProductFilters
                filtros={filtros}
                setFiltros={setFiltros}
                opciones={opcionesFiltros}
                cantidadFiltrosActivos={
                  cantidadFiltrosActivos
                }
                cantidadResultados={
                  productosFiltrados.length
                }
                limpiarFiltros={() =>
                  setFiltros(filtrosIniciales)
                }
                modoMovil
                cerrarFiltros={() =>
                  setFiltrosMovilAbiertos(false)
                }
              />
            </div>
          </div>
        )}

        <HowToBuy />

        <QuoteList
          productos={cotizacion}
          actualizarCantidad={actualizarCantidad}
          eliminarProducto={eliminarProducto}
          vaciarCotizacion={vaciarCotizacion}
        />

        <CustomQuoteForm />
      </main>

      {cotizacion.length > 0 &&
        !filtrosMovilAbiertos && (
          <a
            href="#cotizacion"
            aria-label={`Ver cotización con ${cotizacion.length} productos`}
            className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-between rounded-2xl bg-gray-950 px-5 py-4 text-white shadow-2xl md:hidden"
          >
            <span className="flex items-center gap-2 font-bold">
              <span aria-hidden="true">🛒</span>
              Ver cotización
            </span>

            <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-black">
              {cotizacion.length}
            </span>
          </a>
        )}

      <Footer />

      <Toast mensaje={notificacion} />

      <ProductModal
        producto={productoSeleccionado}
        cerrarModal={cerrarDetalleProducto}
        agregarACotizacion={agregarACotizacion}
      />
    </>
  );
}
