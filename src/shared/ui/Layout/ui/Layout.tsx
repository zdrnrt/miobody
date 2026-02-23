import { Outlet } from "react-router"
const Layout: React.FC = () => {
  return (
    <div className="max-w-6xl 2xl:max-w-7xl mx-auto py-10 px-5">
      <Outlet />
    </div>
  )
}

export default Layout