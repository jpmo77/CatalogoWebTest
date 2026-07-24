export default function BusinessSchema() {

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Brilloplast",
    "description":
      "Empresa dedicada a la fabricación y venta de bolsas de polipropileno.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "La Victoria",
      "addressCountry": "PE"
    },
    "openingHours":
      "Mo-Sa 08:00-19:00"
  };


  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(schema)
      }}
    />
  );
}