import { Link, useParams } from "react-router"
import { getChart } from "@/entities/Chart"
import { useEffect, useState } from "react"
import Content from "./Content/ui/Content"
import { IChart } from "@/entities/Chart"

const Detail: React.FC = () => {

  const { id } = useParams();
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<IChart | null>(null)

  useEffect(() => {
    const controller = new AbortController();
//     setData({
//     "id": 4,
//     "name": "тестовые данные вариант_1",
//     "series": [
//         {
//             "angle": 32,
//             "emg1": -131,
//             "emg2": -97,
//             "emg3": 187,
//             "emg4": -153,
//             "timestamp": 0
//         },
//         {
//             "angle": 32,
//             "emg1": -176,
//             "emg2": -138,
//             "emg3": -238,
//             "emg4": -150,
//             "timestamp": 14
//         },
//         {
//             "angle": 432,
//             "emg1": -179,
//             "emg2": -147,
//             "emg3": -234,
//             "emg4": -154,
//             "timestamp": 26
//         },
//         {
//             "angle": 32,
//             "emg1": -133,
//             "emg2": -101,
//             "emg3": 186,
//             "emg4": -156,
//             "timestamp": 41
//         }
//     ],
//     "stats": {
//         "max": {
//             "angle": 32,
//             "emg1": 1938,
//             "emg2": 1887,
//             "emg3": 1940,
//             "emg4": 1950
//         },
//         "mean": {
//             "angle": 132,
//             "emg1": -234.8135364529456,
//             "emg2": -159.63974325201266,
//             "emg3": -178.8394875320453,
//             "emg4": -208.93188725190987
//         },
//         "peaks": 0
//     }
// })

    getChart(Number(id), controller.signal)
      .then((response) => {
        setError(false)
        console.log(response.data)
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
      {error 
        ? <div className="col-span-full py-2 px-5 text-gray-600">При загрузке данных произошла ошибка</div>
        : ''
      }
      {data 
        ? <Content series={data.series}/> 
        : ''
      }
    </main>
  </>)
}

export default Detail