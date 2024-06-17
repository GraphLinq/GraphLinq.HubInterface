import { HUB_URL } from "@constants/index";
import { Helmet } from "react-helmet-async";
export default function SEO({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const defaultTitle = "Graphlinq Hub";
  const defaultDesc =
    "Explore the hub, where everything happens over the Graphlinq ecosystem, through our app, connect and build around the Graphlinq chain: bridge, swap, launch a token, create and manage LP and much more!";
  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <link rel="canonical" href={HUB_URL} />
      <meta name="description" content={description || defaultDesc} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={HUB_URL} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta
        property="og:image"
        content="https://assets-global.website-files.com/65de56ee9ed70741bfc4efc6/65e64a264313f5bc8aac595e_opengraph.webp"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={HUB_URL} />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta
        property="twitter:description"
        content={description || defaultDesc}
      />
      <meta
        property="twitter:image"
        content="https://assets-global.website-files.com/65de56ee9ed70741bfc4efc6/65e64a264313f5bc8aac595e_opengraph.webp"
      />
    </Helmet>
  );
}
