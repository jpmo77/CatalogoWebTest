import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIRECTORIO_ENTRADA = path.resolve("imagenes-originales");
const DIRECTORIO_SALIDA = path.resolve("public/productos");

const EXTENSIONES_PERMITIDAS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".tif",
  ".tiff",
  ".svg",
]);

const TAMANO = 900;
const CALIDAD_WEBP = 82;

function esImagenPermitida(nombreArchivo) {
  return EXTENSIONES_PERMITIDAS.has(
    path.extname(nombreArchivo).toLowerCase(),
  );
}

async function obtenerArchivos() {
  try {
    const elementos = await fs.readdir(DIRECTORIO_ENTRADA, {
      withFileTypes: true,
    });

    return elementos
      .filter(
        (elemento) =>
          elemento.isFile() &&
          esImagenPermitida(elemento.name),
      )
      .map((elemento) => elemento.name)
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(
        `No existe la carpeta de entrada: ${DIRECTORIO_ENTRADA}`,
      );
    }

    throw error;
  }
}

function validarNombresSalida(archivos) {
  const nombresUsados = new Map();

  for (const archivo of archivos) {
    const nombreBase = path.parse(archivo).name;
    const nombreSalida = `${nombreBase}.webp`.toLowerCase();

    if (nombresUsados.has(nombreSalida)) {
      throw new Error(
        [
          "Dos imágenes producirían el mismo archivo de salida:",
          `- ${nombresUsados.get(nombreSalida)}`,
          `- ${archivo}`,
          `Ambas se convertirían en: ${nombreSalida}`,
        ].join("\n"),
      );
    }

    nombresUsados.set(nombreSalida, archivo);
  }
}

async function optimizarImagen(nombreArchivo) {
  const rutaEntrada = path.join(
    DIRECTORIO_ENTRADA,
    nombreArchivo,
  );

  const nombreBase = path.parse(nombreArchivo).name;
  const nombreSalida = `${nombreBase}.webp`;

  const rutaSalida = path.join(
    DIRECTORIO_SALIDA,
    nombreSalida,
  );

  await sharp(rutaEntrada)
    .rotate()
    .resize({
      width: TAMANO,
      height: TAMANO,
      fit: "contain",
      background: {
        r: 255,
        g: 255,
        b: 255,
        alpha: 1,
      },
      withoutEnlargement: true,
    })
    .flatten({
      background: {
        r: 255,
        g: 255,
        b: 255,
      },
    })
    .webp({
      quality: CALIDAD_WEBP,
      effort: 4,
      smartSubsample: true,
    })
    .toFile(rutaSalida);

  const informacion = await fs.stat(rutaSalida);

  return {
    entrada: nombreArchivo,
    salida: nombreSalida,
    kilobytes: Math.round(informacion.size / 1024),
  };
}

async function main() {
  await fs.mkdir(DIRECTORIO_SALIDA, {
    recursive: true,
  });

  const archivos = await obtenerArchivos();

  if (archivos.length === 0) {
    console.log(
      "No se encontraron imágenes para procesar.",
    );
    console.log(
      `Coloca archivos JPG, PNG, WebP, TIFF o SVG en:\n${DIRECTORIO_ENTRADA}`,
    );
    return;
  }

  validarNombresSalida(archivos);

  console.log(
    `Procesando ${archivos.length} imágenes...\n`,
  );

  const resultados = [];

  for (const archivo of archivos) {
    try {
      const resultado = await optimizarImagen(archivo);
      resultados.push(resultado);

      console.log(
        `✓ ${resultado.entrada} → ${resultado.salida} (${resultado.kilobytes} KB)`,
      );
    } catch (error) {
      console.error(`✗ Error en ${archivo}`);
      console.error(error.message);
      process.exitCode = 1;
    }
  }

  console.log(
    `\nProceso terminado: ${resultados.length} imágenes optimizadas.`,
  );

  console.log(
    `Destino: ${DIRECTORIO_SALIDA}`,
  );
}

main().catch((error) => {
  console.error("\nNo se pudieron optimizar las imágenes.");
  console.error(error.message);
  process.exitCode = 1;
});
