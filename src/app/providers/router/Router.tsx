import { BrowserRouter, Routes, Route } from "react-router";
import { Main } from "@pages/Main";
import { Error } from "@pages/Error";
import { Detail } from "@pages/Detail"
import { Layout } from "@shared/ui/Layout";

export const RouterProvider: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Main />} />
        <Route path="chart/:id" element={<Detail />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>
)