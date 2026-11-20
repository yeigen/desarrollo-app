import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yeigen.comprice',
  appName: 'Comprice',
  webDir: 'dist',
  appendUserAgent: 'Comprice/0.0.1',
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    SystemBars: {
      style: 'LIGHT'
    }
  }
};

export default config;
