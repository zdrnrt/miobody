import { getAll } from "@/entities/Chart"
import { IDataset } from "@/entities/Chart"
import { useEffect, useState } from "react"
import DataItem from "./DataItem/ui/DataItem";
import Upload from "@/widgets/Upload";

const Main: React.FC = () => {

  const [data, setData] = useState<IDataset[]>([])
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController();
    getAll(controller.signal)
      .then((response) => {
        console.log(response.data)
        setData(response.data)
        setError(false)
      })
      .catch((error) => {
        console.error('main getAll error:', error)
        setError(true)
      })
    return () => controller.abort()
  }, [])

  return (<>
    <header className="mb-4 pb-2 border-b-2 border-gray-400">
      <h1 className="text-3xl font-bold">Личный кабинет</h1>
    </header>
    <main>
      <div className="mb-4">
        <Upload />
      </div>
      <h2 className="mb-2 text-2xl font-bold">Список загруженных данных</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {!error 
          ? data.length
            ? data.map((el) => (<DataItem key={el.id} id={el.id} name={el.name} />))
            : <div className="col-span-full py-2 px-5 text-gray-600">Ничего не найдено</div>
          : <div className="col-span-full py-2 px-5 text-gray-600">При загрузке данных произошла ошибка</div>
        }
      </div>
    </main>
  </>)
}

export default Main