import { Link } from "react-router"

const Error: React.FC = () => {
  return (
    <div className="min-h-[calc(100dvh-(--spacing(20)))] flex flex-col align-center justify-center">
      <div className="text-9xl text-center">404</div>
      <h1 className="text-3xl font-bold mb-2 text-center">Страница не найдена</h1>
      <p className="text-center">Вернуться на <Link to={"/"} className="text-indigo-400 hover:text-indigo-600 transition">главную</Link></p>
    </div>
  )
}

export default Error