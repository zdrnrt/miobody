import clsx from "clsx";
import { ChangeEvent, useRef, useState, useCallback, DragEvent } from "react"
import { uploadChart } from "@/entities/Chart";
import { useNavigate } from "react-router";

const Upload: React.FC = () => {

  // const maxFileSize = 1000;

  const [dragging, setDragging] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null)

  const dropzoneRef = useRef<HTMLLabelElement>(null)
  
  const navigate = useNavigate();


  function checkFile(files: FileList): void {
    const file = files[0];

    if (file.size > 16000000){
      setFile(null)
      setError('Файл не должен быть больше 16 МБ')
      return 
    }
    const ext = file.name.slice(file.name.lastIndexOf('.') + 1)
    if (ext !== 'xlsx'){
      setFile(null)
      setError('Файл должен быть с расширением .xlsx')
      return 
    }
    setError(null)
    setFile(file)
  }

   const handleDragEnter = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true)
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false)
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true)
  }, []);
  
  const handleDrop = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false)
    const items = e.dataTransfer.items;
    const files: File[] = [items[0].getAsFile()!];

    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));

    checkFile(dataTransfer.files)

  }, []);

  const inputFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // setFile(e.target.files)
    checkFile(e.target.files!)
  }

  const handleUpload = () => {
    const formData: FormData = new FormData();

    formData.append('file', file!)
    formData.append('dataset_name', file!.name.split('.')[0])

    setLoading(true);
    uploadChart(formData)
      .then((response) => {
        if (response.status == 201){
          const { id } = response.data;
          navigate(`chart/${id}`)
        }
      })
      .catch((error) => {
        console.error('upload', error)
        setError('При загрузке произошла шибка, попробуйте ещё раз')
      })
      .finally(() => {
        setLoading(false)
      })
  }


  return (<div>

    <label className={clsx("flex flex-col justify-center align-center min-h-30 mb-4 p-4 rounded-sm bg-indigo-100 cursor-pointer border-dashed border-2 border-indigo-500 hover:bg-indigo-200 text-center transition", {"bg-indigo-300 text-white border-solid": dragging}, {"pointer-events-none": loading} )}
      ref={dropzoneRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!loading && !file && <div>{!dragging ? 'Выберите или перенесети файл в эту область' : 'Отпустите файл над этой областью' }</div>}
      {loading && <div className="mb-4 text-gray-600">Идет загрузка файла...</div>}
      {file && !loading && <div>Выбран файл: <strong>{file?.name}</strong></div>}
      <div className={clsx('text-rose-400', {'hidden': !error})}>{error}</div>
      <input type="file" name="file" id="file" className="hidden" onChange={inputFileHandler} disabled={loading}/>
    </label>
  
    <button disabled={loading || !file} className="p-2 w-full md:w-auto rounded-sm cursor-pointer bg-indigo-600 hover:bg-indigo-400 text-white transition disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-auto" onClick={handleUpload}>Загрузить файл</button>

  </div>)
}

export default Upload