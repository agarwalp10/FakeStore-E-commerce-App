# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# FakeStore E-commerce App
- built a FakeStore E-Commerce App using React, React Router, and FakeStore.
- this app allows users to view, create, update, and delete products dynamically using API calls
- Can work on mobile screens too

# Main.jsx
- putting App.jsx in BrowserRouter to enable client-side routing

# App.jsx
- the main component that defining the structurea and routing the react applications

# HomePage
- displays the welcome message
- Has 2 buttons, one for the product lists and the other to add a product

# NavBar
- Added in a navbar to include a home, product listing, and add product links

# ProductList
- Fetches data from API, shows an image, title, price, and a button for product details
- Has a card layout for each product

# ProductDetail
- shows the detail of the product on a new page
- uses useParams to get ID from URL
- fetches data based on that ID from API
- displays image, title, description, category, and price
- has a button to add to cart, edit product, or delete product
- Add to Cart uses ProductCreate
- Edit uses ProductEdit
- Delete asks to confrim and then nagivates back tor product page using a Modal and useNavigate

# ProductForm
- creates a form with title, price, description, category and a button to submit
- This form uses initialValue to make it seamless with ProductCreate and ProductEdit

# ProductCreate
- uses ProductForm, allows users to enter data and POST to API

# ProductEdit
- Takes in existing data based on the ID, adds it to the form and allows the user to edit the information with PUT
