import baseConfig from './rollup.config.base.js'
import filesize from 'rollup-plugin-filesize'

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    filesize()
  ]
}
