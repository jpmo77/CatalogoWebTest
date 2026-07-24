import { useEffect, useState } from "react";

const IMAGEN_RESPALDO =
    "/productos/producto-sin-imagen.svg";

export default function ProductImage({
    src,
    alt,
    className = "",
    loading = "lazy",
}) {
    const [imagenActual, setImagenActual] = useState(
        src || IMAGEN_RESPALDO,
    );

    useEffect(() => {
        setImagenActual(src || IMAGEN_RESPALDO);
    }, [src]);

    function manejarError() {
        if (imagenActual !== IMAGEN_RESPALDO) {
            setImagenActual(IMAGEN_RESPALDO);
        }
    }

    return (
        <img
            src={imagenActual}
            alt={alt}
            loading={loading}
            onError={manejarError}
            className={className}
        />
    );
}