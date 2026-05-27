import { Helmet } from 'react-helmet-async';

const PageMeta = ({ title, description, image, url }) => {
  const siteName = 'Solar Link Kenya';
  const defaultDesc = 'Kenya\'s leading solar energy platform — cost calculators, expert guides, and installation services.';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Clean Energy For Every Home`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default PageMeta;
