import { getAll } from "@/entities/Chart"
import { IDataset } from "@/entities/Chart"
import { useEffect, useState } from "react"
import DataItem from "./DataItem/ui/DataItem";

const Main: React.FC = () => {

  const [data, setData] = useState<IDataset[]>([])

  useEffect(() => {
    const controller = new AbortController();
    getAll(controller.signal)
      .then((response) => {
        console.log(response.data)
        setData(response.data)
      })
    return () => controller.abort()
  }, [])

  return (<>
    <header className="md:flex md:justify-between md:items-center mb-4 pb-2 border-b-2 border-gray-400">
      <h1 className="mb-2 md:mb-0 text-3xl font-bold">Личный кабинет</h1>
      <button className="p-2 w-full md:w-auto rounded-sm cursor-pointer bg-indigo-400 hover:bg-indigo-600 text-white transition">Загрузить данные</button>
    </header>
    <main>
      <div className="grid grid-cols-3 gap-2">
        {data.length 
          ? data.map((el) => (<DataItem key={el.id} id={el.id} name={el.name} />))
          : <div className="col-span-full py-2 px-5 text-gray-600">Ничего не найдено</div>
        }
      </div>
    </main>
  </>)
}

export default Main