import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { UserProvider } from './contexts/user.context'
import { CategoriesProvider } from './contexts/categories.context'
import { CartProvider } from './contexts/cart-context'
import {Provider} from 'react-redux';
import {store} from './store/store';
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      {/* any component inside of this user provider nested deep within the app can access the context value inside of the provider itself. */}
        {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
            <CartProvider>
              <App />
            </CartProvider>
          {/* </CategoriesProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
