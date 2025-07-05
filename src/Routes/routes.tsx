import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home.js"
import AllBooks from "../Pages/AllBooks/AllBooks.js";
import AddBook from "@/Pages/AddBooks/AddBook.js";
import BorrowBook from "@/Pages/BorrowBook/BorrowBook.js";
import BorrowSummary from "@/Pages/BorrowSummary/BorrowSummary.js";
import BookDetails from "@/Components/BookDetails/BookDetails.js";
import EditBook from "@/Components/EditBook/EditBook.js";

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
            },
            {
                path:'/borrow/:id',
                element:<BorrowBook/>
            },
            {
                path:'/borrow-summary',
                element:<BorrowSummary/>
            },
            {
                path:'/books/:id',
                element:<BookDetails/>
            },
            {
                path:'/edit-book/:id',
                element:<EditBook/>
            }
        ]
    }
    
])


export default router
