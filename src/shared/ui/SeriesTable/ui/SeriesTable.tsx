import { IChartStat } from '@/entities/Chart'

const SeriesTable: React.FC<{data: IChartStat}> = ({data}) => {
  const { max, mean, peaks } = data;
  return (<div>
    <h2 className='mb-4 text-xl text-gray-600'>Пиковое значение: <span className='font-bold'>{peaks}</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <h2 className='mb-2 text-xl text-gray-600'>Максимальные значения</h2>
      <table className='w-full'>
        <thead className='border-b-2 border-gray-400'>
          <tr>
            {Object.keys(max).map((key) => <th key={key} className='p-1'>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(max).map((value) => <td key={value} className='p-1'>{value.toFixed(2)}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2 className='mb-2 text-xl text-gray-600'>Средние значения</h2>
      <table className='w-full'>
        <thead className='border-b-2 border-gray-400'>
          <tr>
            {Object.keys(mean).map((key) => <th key={key} className='p-1'>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(mean).map((value) => <td key={value} className='p-1'>{value.toFixed(2)}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
    </div>

  </div>)
}

export default SeriesTable