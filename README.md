# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# Evostraclient
-- Admin
email: admin@inventory.com    password: admin123
-- Manager
email: manager@inventory.com   password: manager123
EVASTRO_ASSIGNMENT/
│
├── backend/
│   └── evobackend/
│       ├── node_modules/
│       ├── uploads/
│       ├── .env
│       ├── .gitignore
│       ├── package.json
│       ├── package-lock.json
│       ├── README.md
│       └── server.js
│
├── evoclient/
│   ├── node_modules/
│   │
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── ManagerDashboard.js
│   │   │   ├── LandingPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── Items.js
│   │   │   ├── ProductForm.js
│   │   │   ├── ProductList.js
│   │   │   ├── StatsCards.js
│   │   │   ├── AdminDashboard.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Items.css
│   │   │   ├── LandingPage.css
│   │   │   └── Login.css
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
└── README.md  🛠️ Key Features

The dashboard provides comprehensive control over the application's data:

    Product Management (CRUD):

        Create: Add new products, including ID, name, stock, price, and an image file.

        Read: View a list of all products.

        Update: Edit existing product details (name, stock, price, and optionally, the image).

        Delete: Confirm and remove products from the inventory.

    Product Filtering & Search:

        Search: Filter the product list dynamically by product name.

        Filter: Filter products based on price range (< $50, $50 - $199, $200+).

    User Management (CRUD):

        Read: View a list of all registered users (email and role).

        Update: Edit the role of any user (e.g., changing them from user to admin).

        Delete: Remove users from the system.

    Real-time Feedback: Non-blocking success and error messages are displayed for all CRUD operations.

    Statistics: Displays summary metrics for products (Total, Low Stock, Out of Stock, Categories).

📂 Project Structure

The primary logic resides within the AdminDashboard.js component.
File/Component	Description
AdminDashboard.js	Main container component. Manages all application state (products, users, forms, stats, filters), handles API calls (axios), and contains all forms and CSS styling.
ProductList.js	(Assumed/External) Component responsible for rendering the list of product items, accepting products, onEdit, and onDelete props.

⚙️ Technical Details

State Management

The component utilizes several useState hooks to manage data and UI interactions:

    products, users: Store fetched data arrays.

    stats: Stores calculated product summary data.

    searchTerm, priceFilter: Control the filtering and search inputs.

    showForm: Boolean to control the visibility of the modal/form.

    editingProduct, editUser: Store the object being edited, determining if the modal shows the product form or the user form.

    formData: Stores input values for the current form (product or user).

    feedbackMessage: Controls transient success/error notifications.

API Endpoints (Assumed)

The component relies on the following backend endpoints (running on http://localhost:5000):
Resource	Method	Path	Function
Products	GET	/api/products	Fetch all products.
Products	POST	/api/products	Add a new product (uses multipart/form-data).
Products	PUT	/api/products/:id	Update an existing product (uses multipart/form-data).
Products	DELETE	/api/products/:id	Delete a product.
Users	GET	/api/users	Fetch all users.
Users	PUT	/api/users/:id	Update a user's role.
Users	DELETE	/api/users/:id	Delete a user.

Styling

The entire user interface styling is managed using inline CSS defined within a <style> block inside AdminDashboard.js. It uses CSS variables for a dark, modern aesthetic.

🚀 Setup and Run

    Backend Prerequisite: Ensure your backend API is running and accessible at http://localhost:5000. This API must handle the specified routes and correctly process product image uploads (multipart/form-data).

    Dependencies: Install React dependencies (if not already done).
    Bash

npm install react react-dom react-router-dom axios

Run: Start your React development server.
Bash

npm run dev
# or
npm start
