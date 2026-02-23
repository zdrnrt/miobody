import { IDataset } from "@/entities/Chart"
import { Link } from "react-router";

const DataItem: React.FC<IDataset> = ({id, name}) => {
  return (
    <Link to={`/chart/${id}`} className="p-5 rounded-xl bg-indigo-200 transition hover:bg-indigo-400">
      {name}
    </Link>
  )
}

export default DataItem