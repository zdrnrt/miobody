const Main: React.FC = () => {
  return (
    <div>
      <header className="md:flex md:justify-between md:items-center mb-4 pb-2 border-b-2 border-gray-400">
        <h1 className="mb-2 md:mb-0 text-3xl font-bold">Личный кабинет</h1>
        <button className="p-2 w-full md:w-auto rounded-sm cursor-pointer bg-indigo-400 hover:bg-indigo-600 text-white transition">Загрузить данные</button>
      </header>
    </div>
  )
}

export default Main