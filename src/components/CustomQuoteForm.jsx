import { useState } from "react";
import { cotizarPedidoPersonalizado } from "../utils/whatsapp.js";

const CANTIDAD_MINIMA = 1;

const formularioInicial = {
  nombre: "",
  distrito: "",
  ancho: "",
  largo: "",
  grosor: "",
  cantidad: "",
  uso: "",
  observaciones: "",
};

const fieldClass =
  "w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100";

const errorFieldClass =
  "border-red-400 focus:border-red-500 focus:ring-red-100";

export default function CustomQuoteForm() {
  const [formulario, setFormulario] = useState(
    formularioInicial,
  );

  const [errores, setErrores] = useState({});
  const [mostrarConfirmacion, setMostrarConfirmacion] =
    useState(false);

  function actualizar(campo, valor) {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }));

    setErrores((actuales) => ({
      ...actuales,
      [campo]: "",
    }));

    setMostrarConfirmacion(false);
  }

  function validarFormulario() {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre =
        "Ingresa tu nombre.";
    }

    if (!formulario.distrito.trim()) {
      nuevosErrores.distrito =
        "Ingresa tu distrito o ubicación.";
    }

    if (
      !formulario.ancho ||
      Number(formulario.ancho) <= 0
    ) {
      nuevosErrores.ancho =
        "Ingresa un ancho válido.";
    }

    if (
      !formulario.largo ||
      Number(formulario.largo) <= 0
    ) {
      nuevosErrores.largo =
        "Ingresa un largo válido.";
    }

    if (!formulario.grosor) {
      nuevosErrores.grosor =
        "Selecciona un grosor.";
    }

    if (
      !formulario.cantidad ||
      Number(formulario.cantidad) <
        CANTIDAD_MINIMA
    ) {
      nuevosErrores.cantidad =
        `La cantidad mínima es ${CANTIDAD_MINIMA}.`;
    }

    if (!formulario.uso.trim()) {
      nuevosErrores.uso =
        "Indica para qué utilizarás la bolsa.";
    }

    return nuevosErrores;
  }

  function revisarSolicitud(event) {
    event.preventDefault();

    const nuevosErrores =
      validarFormulario();

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setMostrarConfirmacion(false);
      return;
    }

    setErrores({});
    setMostrarConfirmacion(true);
  }

  function confirmarEnvio() {
    cotizarPedidoPersonalizado(formulario);
    setMostrarConfirmacion(false);
  }

  function claseCampo(campo) {
    return `${fieldClass} ${
      errores[campo] ? errorFieldClass : ""
    }`;
  }

  function mostrarError(campo) {
    if (!errores[campo]) {
      return null;
    }

    return (
      <span className="mt-1 block text-sm font-medium text-red-600">
        {errores[campo]}
      </span>
    );
  }

  return (
    <section
      id="personalizada"
      className="bg-emerald-50 py-16"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Fabricación personalizada
          </p>

          <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
            ¿No encuentras la medida que necesitas?
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Completa los datos de tu solicitud,
            revísalos y envíalos directamente por
            WhatsApp.
          </p>

          <div className="mt-7 rounded-2xl border border-emerald-200 bg-white p-5">
            <p className="font-bold text-gray-950">
              Antes de solicitar
            </p>

            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• Confirma las medidas en centímetros.</li>
              <li>• Indica la cantidad aproximada.</li>
              <li>• Cuéntanos para qué utilizarás la bolsa.</li>
            </ul>
          </div>
        </div>

        <form
          onSubmit={revisarSolicitud}
          noValidate
          className="grid gap-4 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:grid-cols-2"
        >
          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold">
              Nombre del cliente *
            </span>

            <input
              className={claseCampo("nombre")}
              type="text"
              autoComplete="name"
              maxLength="80"
              placeholder="Ejemplo: Carlos Ramírez"
              value={formulario.nombre}
              onChange={(event) =>
                actualizar(
                  "nombre",
                  event.target.value,
                )
              }
            />

            {mostrarError("nombre")}
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold">
              Distrito o ubicación *
            </span>

            <input
              className={claseCampo("distrito")}
              type="text"
              autoComplete="address-level2"
              maxLength="100"
              placeholder="Ejemplo: San Juan de Lurigancho"
              value={formulario.distrito}
              onChange={(event) =>
                actualizar(
                  "distrito",
                  event.target.value,
                )
              }
            />

            {mostrarError("distrito")}
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Ancho (cm) *
            </span>

            <input
              className={claseCampo("ancho")}
              type="number"
              inputMode="decimal"
              min="1"
              step="0.1"
              placeholder="Ejemplo: 35"
              value={formulario.ancho}
              onChange={(event) =>
                actualizar(
                  "ancho",
                  event.target.value,
                )
              }
            />

            {mostrarError("ancho")}
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Largo (cm) *
            </span>

            <input
              className={claseCampo("largo")}
              type="number"
              inputMode="decimal"
              min="1"
              step="0.1"
              placeholder="Ejemplo: 50"
              value={formulario.largo}
              onChange={(event) =>
                actualizar(
                  "largo",
                  event.target.value,
                )
              }
            />

            {mostrarError("largo")}
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Grosor *
            </span>

            <select
              className={claseCampo("grosor")}
              value={formulario.grosor}
              onChange={(event) =>
                actualizar(
                  "grosor",
                  event.target.value,
                )
              }
            >
              <option value="">
                Seleccionar
              </option>
              <option value="Delgado">
                Delgado
              </option>
              <option value="Intermedio">
                Intermedio
              </option>
              <option value="Grueso">
                Grueso
              </option>
              <option value="Por recomendar">
                Necesito recomendación
              </option>
            </select>

            {mostrarError("grosor")}
          </label>

          <label>
            <span className="mb-2 block text-sm font-semibold">
              Cantidad aproximada *
            </span>

            <input
              className={claseCampo("cantidad")}
              type="number"
              inputMode="numeric"
              min={CANTIDAD_MINIMA}
              step="1"
              placeholder="Ejemplo: 2000"
              value={formulario.cantidad}
              onChange={(event) =>
                actualizar(
                  "cantidad",
                  event.target.value,
                )
              }
            />

            {mostrarError("cantidad")}
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold">
              Uso de la bolsa *
            </span>

            <input
              className={claseCampo("uso")}
              type="text"
              maxLength="150"
              placeholder="Ejemplo: empaque de ropa"
              value={formulario.uso}
              onChange={(event) =>
                actualizar(
                  "uso",
                  event.target.value,
                )
              }
            />

            {mostrarError("uso")}
          </label>

          <label className="sm:col-span-2">
            <span className="mb-2 block text-sm font-semibold">
              Observaciones
            </span>

            <textarea
              className={`${fieldClass} min-h-28 resize-y`}
              maxLength="500"
              placeholder="Color, impresión, tipo de material u otra característica"
              value={formulario.observaciones}
              onChange={(event) =>
                actualizar(
                  "observaciones",
                  event.target.value,
                )
              }
            />

            <span className="mt-1 block text-right text-xs text-gray-500">
              {formulario.observaciones.length}/500
            </span>
          </label>

          <button
            type="submit"
            className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700 sm:col-span-2"
          >
            Revisar solicitud
          </button>

          {mostrarConfirmacion && (
            <div
              className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:col-span-2"
              role="status"
            >
              <h3 className="font-black text-gray-950">
                Revisa tu solicitud
              </h3>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Cliente:</strong>{" "}
                  {formulario.nombre}
                </p>

                <p>
                  <strong>Ubicación:</strong>{" "}
                  {formulario.distrito}
                </p>

                <p>
                  <strong>Medida:</strong>{" "}
                  {formulario.ancho} ×{" "}
                  {formulario.largo} cm
                </p>

                <p>
                  <strong>Grosor:</strong>{" "}
                  {formulario.grosor}
                </p>

                <p>
                  <strong>Cantidad:</strong>{" "}
                  {formulario.cantidad}
                </p>

                <p>
                  <strong>Uso:</strong>{" "}
                  {formulario.uso}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmacion(false)
                  }
                  className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  Seguir editando
                </button>

                <button
                  type="button"
                  onClick={confirmarEnvio}
                  className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
                >
                  Abrir WhatsApp
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}