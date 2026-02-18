import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddBlog,
  AddEvent,
  AddProduct,
  Blogs,
  Dashboard,
  EditBlog,
  EditEvent,
  EditProduct,
  Error,
  Event,
  ForgotPassowrd,
  Login,
  Product,
  ResetPassword,
  SingleBlog,
  SingleEvent,
  SingleProduct,
} from "./pages";
import Layout from "./components/layouts/Layout";
import { userLoader } from "./loader/userLoader";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3,
    },
  },
});

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      loader: userLoader,
      errorElement: <Error />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "products", element: <Product /> },
        { path: "products/new", element: <AddProduct /> },
        { path: "products/:id", element: <SingleProduct /> },
        { path: "products/:id/edit", element: <EditProduct /> },
        { path: "blogs", element: <Blogs /> },
        { path: "blogs/new", element: <AddBlog /> },
        { path: "blogs/:id", element: <SingleBlog /> },
        { path: "blogs/:id/edit", element: <EditBlog /> },
        { path: "events", element: <Event /> },
        { path: "events/new", element: <AddEvent /> },
        { path: "events/edit/:id", element: <SingleEvent /> },
        { path: "events/:id", element: <EditEvent /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassowrd /> },
    { path: "/reset-password", element: <ResetPassword /> },
  ]);
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
