import * as fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";

XLSX.set_fs(fs);

const RUTA_EXCEL = path.resolve(
  "data/productos.xlsx",
);

const RUTA_JSON = path.resolve(
  "src/data/productos.json",
);

const RUTA_IMAGENES = path.resolve(
  "public/productos",
);

const NOMBRE_HOJA = "Productos";

const SOLO_VALIDAR =
  process.argv.includes("--solo-validar");

const EXTENSIONES_PERMITIDAS = new Set([
  ".webp",
  ".jpg",
  ".jpeg",
  ".png",
]);

function texto(valor) {
  return String(valor ?? "").trim();
}

function convertirBooleano(
  valor,
  permitirVacio = false,
) {
  const valorNormalizado = texto(valor).toLowerCase();

  if (
    ["si", "sí", "true", "1"].includes(
      valorNormalizado,
    )
  ) {
    return true;
  }

  if (
    ["no", "false", "0"].includes(valorNormalizado)
  ) {
    return false;
  }

  if (!valorNormalizado && permitirVacio) {
    return false;
  }

  return null;
}

function agregarDuplicados(
  registros,
  campo,
  nombreCampo,
  errores,
) {
  const valores = new Map();

  registros.forEach(({ producto, numeroFila }) => {
    let valor = producto[campo];

    if (typeof valor === "string") {
      valor = valor.toLocaleLowerCase("es");
    }

    if (
      valor === "" ||
      valor === null ||
      valor === undefined
    ) {
      return;
    }

    if (!valores.has(valor)) {
      valores.set(valor, []);
    }

    valores.get(valor).push(numeroFila);
  });

  valores.forEach((filas, valor) => {
    if (filas.length > 1) {
      errores.push(
        `${nombreCampo} duplicado "${valor}" en las filas ${filas.join(", ")}.`,
      );
    }
  });
}

function obtenerImagenesDisponibles() {
  if (!fs.existsSync(RUTA_IMAGENES)) {
    return [];
  }

  return fs
    .readdirSync(RUTA_IMAGENES, {
      withFileTypes: true,
    })
    .filter((archivo) => archivo.isFile())
    .map((archivo) => archivo.name)
    .filter((nombre) =>
      EXTENSIONES_PERMITIDAS.has(
        path.extname(nombre).toLowerCase(),
      ),
    );
}

function main() {
  const errores = [];
  const advertencias = [];

  if (!fs.existsSync(RUTA_EXCEL)) {
    throw new Error(
      `No se encontró el Excel: ${RUTA_EXCEL}`,
    );
  }

  if (!fs.existsSync(RUTA_IMAGENES)) {
    errores.push(
      `No existe la carpeta de imágenes: ${RUTA_IMAGENES}`,
    );
  }

  const workbook = XLSX.readFile(RUTA_EXCEL);
  const worksheet = workbook.Sheets[NOMBRE_HOJA];

  if (!worksheet) {
    throw new Error(
      `No existe la hoja "${NOMBRE_HOJA}".`,
    );
  }

  const filas = XLSX.utils.sheet_to_json(
    worksheet,
    {
      defval: "",
      raw: true,
    },
  );

  if (filas.length === 0) {
    throw new Error(
      `La hoja "${NOMBRE_HOJA}" no contiene productos.`,
    );
  }

  const imagenesDisponibles =
    obtenerImagenesDisponibles();

  const conjuntoImagenes = new Set(
    imagenesDisponibles,
  );

  const registros = filas.map((fila, indice) => {
    const numeroFila = indice + 2;

    const id = Number(fila.Id);
    const codigo = texto(fila.Codigo);
    const nombreImagen = texto(fila.Imagen);

    const activo = convertirBooleano(
      fila.Activo,
    );

    const destacado = convertirBooleano(
      fila.Destacado,
      true,
    );

    const producto = {
      id,
      codigo,
      nombre: texto(fila.Nombre),
      ancho: Number(fila.Ancho),
      largo: Number(fila.Largo),
      grosor: texto(fila.Grosor),
      color: texto(fila.Color),
      presentacion: texto(fila.Presentacion),
      imagen: nombreImagen
        ? `/productos/${nombreImagen}`
        : "",
      destacado:
        destacado === null ? false : destacado,
      activo: activo === true,
    };

    if (!Number.isInteger(id) || id <= 0) {
      errores.push(
        `Fila ${numeroFila}: Id inválido.`,
      );
    }

    if (!producto.codigo) {
      errores.push(
        `Fila ${numeroFila}: Código vacío.`,
      );
    }

    if (!producto.nombre) {
      errores.push(
        `Fila ${numeroFila}: Nombre vacío.`,
      );
    }

    if (activo === null) {
      errores.push(
        `Fila ${numeroFila}: Activo debe ser "Sí" o "No".`,
      );
    }

    if (destacado === null) {
      errores.push(
        `Fila ${numeroFila}: Destacado debe ser "Sí" o "No".`,
      );
    }

    /*
     * Las características comerciales y la imagen
     * son obligatorias para productos activos.
     */
    if (activo === true) {
      if (
        !Number.isFinite(producto.ancho) ||
        producto.ancho <= 0
      ) {
        errores.push(
          `Fila ${numeroFila}: Ancho inválido.`,
        );
      }

      if (
        !Number.isFinite(producto.largo) ||
        producto.largo <= 0
      ) {
        errores.push(
          `Fila ${numeroFila}: Largo inválido.`,
        );
      }

      if (!producto.grosor) {
        errores.push(
          `Fila ${numeroFila}: Grosor vacío.`,
        );
      }

      if (!producto.presentacion) {
        errores.push(
          `Fila ${numeroFila}: Presentación vacía.`,
        );
      }

      if (!nombreImagen) {
        errores.push(
          `Fila ${numeroFila}: Imagen vacía.`,
        );
      }
    }

    if (nombreImagen) {
      const extension = path
        .extname(nombreImagen)
        .toLowerCase();

      if (path.basename(nombreImagen) !== nombreImagen) {
        errores.push(
          `Fila ${numeroFila}: En Imagen coloca solamente el nombre del archivo.`,
        );
      }

      if (!EXTENSIONES_PERMITIDAS.has(extension)) {
        errores.push(
          `Fila ${numeroFila}: Extensión de imagen no permitida en "${nombreImagen}".`,
        );
      }

      if (
        activo === true &&
        !conjuntoImagenes.has(nombreImagen)
      ) {
        errores.push(
          `Fila ${numeroFila}: No existe public/productos/${nombreImagen}.`,
        );
      }
    }

    return {
      producto,
      numeroFila,
      nombreImagen,
    };
  });

  agregarDuplicados(
    registros,
    "id",
    "Id",
    errores,
  );

  agregarDuplicados(
    registros,
    "codigo",
    "Código",
    errores,
  );

  const imagenesReferenciadas = new Set(
    registros
      .map((registro) => registro.nombreImagen)
      .filter(Boolean),
  );

  imagenesDisponibles.forEach((imagen) => {
    if (!imagenesReferenciadas.has(imagen)) {
      advertencias.push(
        `La imagen "${imagen}" no está relacionada con ningún producto.`,
      );
    }
  });

  if (advertencias.length > 0) {
    console.warn(
      `\n⚠️ ${advertencias.length} advertencia(s):\n`,
    );

    advertencias.forEach(
      (advertencia, indice) => {
        console.warn(
          `${indice + 1}. ${advertencia}`,
        );
      },
    );
  }

  if (errores.length > 0) {
    console.error(
      `\n❌ Se encontraron ${errores.length} error(es):\n`,
    );

    errores.forEach((error, indice) => {
      console.error(`${indice + 1}. ${error}`);
    });

    console.error(
      "\nNo se modificó productos.json.",
    );

    process.exitCode = 1;
    return;
  }

  const productosActivos = registros
    .filter(
      ({ producto }) => producto.activo,
    )
    .map(({ producto }) => producto);

  console.log(
    `\n✅ ${filas.length} filas validadas.`,
  );

  console.log(
    `✅ ${productosActivos.length} productos activos.`,
  );

  console.log(
    `✅ ${imagenesDisponibles.length} imágenes encontradas.`,
  );

  if (SOLO_VALIDAR) {
    console.log(
      "✅ Validación terminada. No se generó el JSON.",
    );
    return;
  }

  fs.mkdirSync(path.dirname(RUTA_JSON), {
    recursive: true,
  });

  fs.writeFileSync(
    RUTA_JSON,
    `${JSON.stringify(productosActivos, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `✅ JSON generado correctamente en ${RUTA_JSON}.`,
  );
}

main();