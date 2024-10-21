import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetAttributify(), presetUno(), presetIcons({ scale: 1.2, warn: true })],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
    ['card-shadow', { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' }],
  ],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['text-ellipsis', 'truncate'],
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      success: 'var(--success-color)',
      warning: 'var(--warning-color)',
      serious: 'var(--serious-color)',
      danger: 'var(--danger-color)',
      error: 'var(--error-color)',
      info: 'var(--info-color)',
    },
  },
});
