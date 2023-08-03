/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import { firestorePlugin } from 'vuefire'

export function registerPlugins (app) {
  loadFonts()
  app.use(vuetify).use(firestorePlugin)
}
