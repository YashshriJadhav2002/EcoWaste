/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    './src/Components/chatBox/Button/index.js',
    './src/Components/chatBox/Input/index.js',
    './src/Components/chatBox/chatbox/index.js',
    './src/Components/Dashboard/Vendor_Dashboard/index.js',
    './src/Components/Login/Login.js',
    './src/Components/Register/Seller_register.js',
    './src/Components/Dashboard/Seller-Dashboard/Seller_Cart.js',
    './src/Components/Dashboard/Company_Dashboard/Company_Cart.js',
    './src/Components/Dashboard/Seller-Dashboard/Seller_Exact_Price.js'
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#1476ff",
        'secondary': "#f3f5ff",
        'light': "#f9faff",
        'headings':'#00a49c'
      },
    },
  },
  plugins: [],
}

