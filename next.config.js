/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  exclude: ["/discover", "'/api/*'"],
});

const securityHeaders = [
  //Informs the browser that this page should only access pages using HTTPS
  //Blocks access to websites that can only be served over HTTP
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  //Prevents page from loading if it detects XSS attacks
  //Can be used for legacy browsers that don't support CSP
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  //Performs domain name resolution on external links
  //Reduces latency when the user clicks a link
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
];

const nextConfig = {
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  images: {
    domains: ["images.deso.org"],
  },
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
