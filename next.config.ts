import type { NextConfig } from 'next'

import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => [
    {
      source: '/',
      destination: '/home',
      permanent: true,
      locale: false,
    },{
      source: '/:lang(en|br)',
      destination: '/:lang/home',
      permanent: true,
      locale: false,
    },
    {
      source: '/:path((?!en/|br/|api|images|favicon.ico|manifest.json|icon*).*?)',
      destination: '/br/:path*',
      permanent: true,
      locale: false,
    },
  ],
}

export default withPWA({
  dest: 'public',
  mode: 'production',

  // disable: process.env.NODE_ENV === 'development',
})(nextConfig)
