import { Link, useParams } from "react-router"
import { getChart } from "@/entities/Chart"
import { useEffect, useState } from "react"
import { IChart } from "@/entities/Chart"
import { SeriesTable } from "@/shared/ui/SeriesTable"
import { SeriesChart } from "@/shared/ui/SeriesChart"

const Detail: React.FC = () => {

  const { id } = useParams();
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<IChart | null>(null)

  useEffect(() => {
    const controller = new AbortController();
    getChart(Number(id), controller.signal)
      .then((response) => {
        setError(false)
        setData(response.data)
      })
      .catch((error) => {
        console.error('detail getChart error:', error)
        setError(true)
      })
    return () => controller.abort();
  }, [id])

  return (<>
    <header className="md:flex md:justify-between md:items-center mb-4 pb-2 border-b-2 border-gray-400">
      <h1 className="mb-2 md:mb-0 text-3xl font-bold">{data ? `График: ${data.name}` : 'График'}</h1>
      <Link to={"/"} className="text-indigo-400 hover:text-indigo-600">На главную</Link>
    </header>
    <main>
      {error && <div className="col-span-full py-2 px-5 text-gray-600">При загрузке данных произошла ошибка</div>}
      {!data && !error && <div className="col-span-full py-2 px-5 text-gray-600">Идет загрузка</div>}
      {data && <SeriesChart data={data.series}/> }
      {data && <SeriesTable data={data.stats}/> }
    </main>
  </>)
}

export default Detail