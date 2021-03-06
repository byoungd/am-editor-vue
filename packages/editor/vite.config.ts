import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import Vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import WindiCSS from 'vite-plugin-windicss'
// import { cjs2esmVitePlugin } from 'cjs2esmodule'
import path from 'path'

export default () => {
  const markdownWrapperClasses = 'prose prose-sm m-auto text-left'
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Vue(),
      // cjs2esmVitePlugin(),
      // https://github.com/vbenjs/vite-plugin-vue-setup-extend
      VueSetupExtend(),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        pagesDir: [{ dir: 'src/pages', baseRoute: '' }],
        extensions: ['vue', 'md'],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        layoutsDirs: 'src/layouts',
      }),
      // https://github.com/antfu/vite-plugin-windicss
      WindiCSS({
        safelist: markdownWrapperClasses,
      }),
      // https://github.com/antfu/vite-ssg
    ], // to process SFC
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'editor',
        format: ['es', 'umd'],
        fileName: (format) => `editor.${format}.js`,
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue', /primevue\/.+/, 'ant-design-vue'],
        output: {
          // disable warning on src/index.ts using both default and named export
          exports: 'named',
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
        },
      },
      emptyOutDir: false, // to retain the types folder generated by tsc
    },
    server: {
      open: true,
      fs: {
        strict: true,
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  }
}
