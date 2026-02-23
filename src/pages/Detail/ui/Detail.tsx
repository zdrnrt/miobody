import { Link } from "react-router"

const Detail: React.FC = () => {

  return (<>
    <header className="md:flex md:justify-between md:items-center mb-4 pb-2 border-b-2 border-gray-400">
      <h1 className="mb-2 md:mb-0 text-3xl font-bold">График</h1>
      <Link to={"/"} className="text-indigo-400 hover:text-indigo-600">На главную</Link>
    </header>
    <main>

    </main>
  </>)
}

export default Detail