import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/routes.tsx'
import { Provider } from 'react-redux'
import {store} from '@/Redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        
        <RouterProvider router={router}/>
      </Provider>
  </StrictMode>,
)
