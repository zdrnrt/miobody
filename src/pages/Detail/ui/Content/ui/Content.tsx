import { IChartSeries } from '@/entities/Chart'
import {SeriesChart} from './SeriesChart/ui/SeriesChart'

const Content: React.FC<{series: IChartSeries[]}> = ({series}) => {
  console.log('content', series)

  return (<div>
    <SeriesChart data={series}/>
  </div>)
}

export default Content;