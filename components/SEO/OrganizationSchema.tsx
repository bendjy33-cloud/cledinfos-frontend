export default function OrganizationSchema({
  settings,
}: {
  settings: any;
}) {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",

    name: settings.site_name || "Clé d'Infos",

    url: SITE_URL,

    logo: {
      "@type": "ImageObject",
      url:
        settings.logo_url ||
        `${SITE_URL}/icon-512.png`,
    },

    description: settings.description,

    contactPoint: {
      "@type": "ContactPoint",
      email: settings.email,
      telephone: settings.phone,
      contactType: "customer service",
    },

    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
        }
      : undefined,

    sameAs: [
      settings.facebook,
      settings.instagram,
      settings.youtube,
      settings.twitter,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}