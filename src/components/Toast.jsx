export default function Toast({ mensaje }) {
  if (!mensaje) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl bg-gray-950 px-5 py-4 text-white shadow-2xl"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-500 font-black">
        ✓
      </span>

      <div>
        <p className="font-bold">Cotización actualizada</p>

        <p className="mt-0.5 text-sm text-gray-300">
          {mensaje}
        </p>
      </div>
    </div>
  );
}