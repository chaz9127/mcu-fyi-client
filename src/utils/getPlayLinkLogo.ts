// Real domains are matched, so that "notamazon.com" or "example.com/amazon" don't count.
const PROVIDERS = [
  { domain: /(^|\.)disneyplus\.com$/, logo: '/images/logos/DisneyPlus.png' },
  { domain: /(^|\.)(amazon\.(com|ca|co\.uk|com\.au|de)|primevideo\.com|amzn\.to)$/, logo: '/images/logos/Amazon.png' },
];

// Returns undefined for any other provider.
export const getPlayLinkLogo = (playLink: string) => {
  try {
    const { hostname } = new URL(playLink);
    return PROVIDERS.find(({ domain }) => domain.test(hostname))?.logo;
  } catch {
    return undefined;
  }
}
