import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home.js"
import AllBooks from "../Pages/AllBooks/AllBooks.js";
import AddBook from "@/Pages/AddBooks/AddBook.js";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/books',
                element:<AllBooks/>
            },
            {
                path:'/create-book',
                element:<AddBook/>
            }
        ]
    }
    
])


export default router
