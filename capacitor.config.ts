import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yeigen.misiones',
  appName: 'Misiones',
  webDir: 'dist',
  plugins: {
    SystemBars: {
      style: 'LIGHT'
    }
  }
};

export default config;
