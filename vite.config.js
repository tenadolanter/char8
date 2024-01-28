import { resolve } from 'path'
export default () =>  {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'char8',
        fileName: 'char8',
        formats: ['es', 'umd', 'iife'],
      },
      outDir: "lib",
    },
  }
}