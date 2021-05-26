import { ItemModel } from './AktualnosciTypes'
import { useState, useEffect } from 'react'

const useAktualnosciData: (id: string | null) => ItemModel[] = (id) => {
  const [ data, setData ] = useState<ItemModel[]>([])
  const fetchData = () => {
    fetch(`https://digicos.ddns.net:8001/aktualnosci/${id ? `get_single/${id}` : 'get_all'}`)
    .then(resource => resource.json())
    .then(data => setData(data))
  }
  useEffect(() => fetchData(), [id])
  return data
}

export default useAktualnosciData