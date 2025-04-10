# E-Commercer frontend

This is a frontend application built using **ReactJS** and **TailwindCSS**, integrating with **[Reqres API](https://reqres.in/)** for authentication and **[FakeStore API](https://fakestoreapi.com/)** for e-commerce product data.

<!-- markdownlint-disable MD033 MD045 -->
<p align="center">
    <img src="./src/assets/ULtrastore.svg">
</p>

## 🚀 Features

- ✅ User login using Reqres API
- 🛒 Browse and view products from FakeStore API
- 📦 Product details page
- 🔄 Loading states and error handling
- 💨 Styled with TailwindCSS
- ⚛️ Built using React functional components & hooks
- 🔁 Routing with React Router DOM
- 🏪 State management with redux toolkit

## 🧰 Tech Stack

- **ReactJS** - Javascript library for frontend application
- **TailwindCSS** - For Styling
- **React Router DOM** - for Routing
- **Reqres API** – for dummy login
- **FakeStore API** – for product listings and details
- **Redux Toolkit** - for state management
- **React Icons** - for icons

<!-- Add screenshots here if you have them -->
## 📸 Screenshots

![Login Page](./Screenshot/Login.png) ![Product List](./Screenshot/list.png) ![Product Details](./Screenshot/Product.png)

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Gopendranath/E-commerce-frontend.git
cd E-commerce-frontend

# Install dependencies
npm install

# Run the development server
npm run dev

# Build the production version
npm run build

# Start the production server
npm run preview
```

App will be running at: [http://localhost:5173](http://localhost:5173/)

## 🔑 Dummy Login Credentials

Use the following to log in (from Reqres API docs):

```bash
Email: eve.holt@reqres.in
Password: anything
```

## 🔗 APIs Used

Reqres API: [https://reqres.in/](https://reqres.in/)

FakeStore API: [https://fakestoreapi.com/](https://fakestoreapi.com/)

## 📂 Folder Structure

```bash
.
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.jsx
│   ├── assets
│   │   ├── ULtrastore.svg
│   │   └── react.svg
│   ├── components
│   │   ├── Category.jsx
│   │   ├── FaQ.jsx
│   │   ├── Featureproduct.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Policy.jsx
│   │   ├── Productcard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Seachmodal.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   ├── Categoryproduct.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Notfound.jsx
│   │   ├── Orders.jsx
│   │   ├── Product.jsx
│   │   ├── Profile.jsx
│   │   ├── Search.jsx
│   │   ├── Selectedfeature.jsx
│   │   ├── Wishlist.jsx
│   │   └── confirm.jsx
│   └── redux
│       ├── slices
│       │   ├── authSlice.js
│       │   ├── cartSlice.js
│       │   ├── productSlice.js
│       │   └── wishListSlice.js
│       └── store.js
└── vite.config.js
```

## ⚙️ Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

## 🙌 Acknowledgements

- [Reqres](https://reqres.in/)
- [FakeStore](https://fakestoreapi.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Router DOM](https://reactrouter.com/en/main)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)

---
