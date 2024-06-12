import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import BlogForm from "./pages/BlogForm";

function Router() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: "/:postId",
                    element: <BlogPost />
                },
                {
                    path: "/:postId/edit",
                    element: <BlogForm />
                },
            ]
        }
    ])


    return <RouterProvider router={router} />
}

export default Router;