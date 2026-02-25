export interface IChart {
  id: number
  name: string
  series: IChartSeries[]
  stats: IChartStat
}

export interface IChartStat{
  max: IChartItemStat
  mean: IChartItemStat
  peaks: number
}

export interface IChartSeries extends IChartItemStat{
  timestamp: number
}

export interface IChartItemStat{
  angle: number
  emg1: number
  emg2: number
  emg3: number
  emg4: number
}

export interface IDataset{
  id: number,
  name: string
}