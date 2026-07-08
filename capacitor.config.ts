import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.piseokok.app',
  appName: '피서콕',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
