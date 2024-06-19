import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import BlogForm from "./pages/BlogForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

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
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/:postId",
                    element: <ProtectedRoute>
                        <BlogPost />
                    </ProtectedRoute>
                },
                {
                    path: "/create",
                    element: <ProtectedRoute>
                        <BlogForm />
                    </ProtectedRoute>
                },
                {
                    path: "/:postId/edit",
                    element: <ProtectedRoute>
                        <BlogForm />
                    </ProtectedRoute>
                },
            ]
        }
    ])


    return <RouterProvider router={router} />
}

export default Router;