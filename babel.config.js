module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ['@babel/preset-react', {
      runtime: 'automatic',
      development: process.env.NODE_ENV === 'development',
      importSource: '@welldone-software/why-did-you-render'
    }]
  ],
  plugins: ['@babel/proposal-class-properties', '@babel/proposal-object-rest-spread'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
  },
};
