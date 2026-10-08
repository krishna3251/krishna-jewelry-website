import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

/**
 * Adds canonical/og:url tags and writes sitemap.xml + a robots.txt Sitemap line
 * when VITE_SITE_URL is configured. Without it the build stays domain-agnostic
 * instead of shipping a guessed URL.
 */
function seoPlugin(siteUrl: string): Plugin {
  const origin = siteUrl.replace(/\/+$/, '');

  return {
    name: 'krishna-jewelry-seo',
    apply: 'build',
    transformIndexHtml(html) {
      if (!origin) return html;
      return html.replace(
        '</head>',
        `    <link rel="canonical" href="${origin}/" />\n    <meta property="og:url" content="${origin}/" />\n  </head>`
      );
    },
    closeBundle() {
      if (!origin) return;
      const outDir = path.resolve(__dirname, 'dist');
      const pages = ['/', '/privacy.html', '/terms.html'];
      const lastmod = new Date().toISOString().slice(0, 10);
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...pages.map(page => `  <url><loc>${origin}${page}</loc><lastmod>${lastmod}</lastmod></url>`),
        '</urlset>',
        '',
      ].join('\n');

      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);

      const robotsPath = path.join(outDir, 'robots.txt');
      const robots = `${fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8').trimEnd() : 'User-agent: *\nAllow: /'}\nSitemap: ${origin}/sitemap.xml\n`;
      fs.writeFileSync(robotsPath, robots);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react(), tailwindcss(), seoPlugin(env.VITE_SITE_URL ?? '')],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
