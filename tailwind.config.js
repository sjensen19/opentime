/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      '**/*.{html,css,js,ejs}',
      'node_modules/preline/dist/*.js',
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('preline/plugin'),
    ],
}