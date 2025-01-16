// https://nuxt.com/docs/api/configuration/nuxt-config
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    baseURL: process.env.BASE_PATH || '/',
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
  ssr: true,
  runtimeConfig: {
    public: {
      wpApiUrl: process.env.WP_API_URL,
    },
  },
  components: ['~/components/shared', '~/components/elements', '~/components/sections', '~/components/top'],
  modules: [
    [
      'unplugin-icons/nuxt',
      {
        customCollections: {
          // NOTE: key がアイコンのコレクション名になるので `icons` のところは任意の名前でOK
          icons: FileSystemIconLoader('./assets/images/icons'),
        },
      },
    ],
  ],
  css: ['destyle.css', '~/assets/styles/global.scss', '~/assets/styles/_base.scss'],
  plugins: [{ src: '~/plugins/vw-vh', mode: 'client' }],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use 'sass:math' as math;
            @use 'sass:map' as map;
            @use '~/assets/styles/_mixins/container-query.scss' as cq;
            @use '~/assets/styles/_mixins/media-query.scss' as mq;
            @use '~/assets/styles/_mixins/typography.scss' as typo;
            @use '~/assets/styles/_mixins/other.scss' as o;
            @use '~/assets/styles/_variables.scss' as vars;
          `,
        },
      },
    },
  },
});
