export interface IChart {
  id: number
  name: string
  series: IChartSeries[]
  stats: {
    max: IChartStat,
    mean: IChartStat,
    peaks: number
  }
}

export interface IChartSeries extends IChartStat{
  timestamp: number
}

export interface IChartStat{
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