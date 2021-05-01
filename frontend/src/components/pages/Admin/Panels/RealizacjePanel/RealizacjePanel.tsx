import './RealizacjePanel.scss'
import { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SearchMenuInterface {
  setSearchString: (s: string) => void
  searchString: string
  AddItem: () => void
}



const Menu: React.FC<SearchMenuInterface> = ({setSearchString, AddItem, searchString}) => {
  const [ inputKey, setInputKey ] = useState(0)
  /* Change key of input so that defaultValue refreshes without initialization */
  const clearQueryInput = () => {
    setSearchString('')
    setInputKey(k => ++k)
  }
  return (
    <div className="Menu__container">
      <div className="Menu">
        <div className="Menu__options__title">Wyszukaj</div>
        <div className="Search__modal">
          <div className="Search__modal__content">
            <label htmlFor="queryForm">
              Query:
              <div className="queryFrom__container">
                <input placeholder="string" key={`queryForm_${inputKey}`} className="queryForm" id="queryForm" onChange={(v) => setSearchString(v.target.value)} defaultValue={searchString} />
                <div className="Icon__clear" onClick={() => {setSearchString(''); clearQueryInput()}}>X</div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <button onClick={() => AddItem()} className="Menu__options__title">Dodaj</button>
    </div>
  )
}

interface ItemOptionsInterface {
  isEdited: boolean
  toggleEdit: () => void
  commitChange: () => void
  deleteItem: () => void
}

const ItemOptions: React.FC<ItemOptionsInterface> = ({deleteItem, isEdited, toggleEdit, commitChange}) => {
  return (
    <div className="Item__options">
      {
      isEdited ? (
          <div className="pointer" onClick={() => {toggleEdit(); commitChange()}}>Zapisz</div>
        ) : (
          <div className="pointer" onClick={() => toggleEdit()}>Edytuj</div>
        )
      }
      <div className="pointer" onClick={() => deleteItem()}>Usuń</div>
    </div>
  )
}

const ItemDate: React.FC<{item: ItemModel, updateItem: (v: ItemModel) => void}> = ({ item, updateItem }) => {
  const [ isNadal, setNadal ] = useState<boolean>(item.yearTo === "Nadal")
  const fromDate = new Date(`${item.yearFrom}-01-01`)
  const toDate = new Date(`${item.yearTo}-01-01`)
  const modifyDateTo = (v?: number) => {
    console.log(isNadal, "kddd")
    v ? updateItem({...item, yearTo: v}) : updateItem({...item, yearTo: "Nadal"})
    console.log(item)
  }
  return (
    <div className="Item__date">
      <div>
        <DatePicker selected={fromDate} showYearPicker dateFormat="yyyy" onChange={(v: Date) => updateItem({...item, yearFrom: v.getFullYear()})} yearItemNumber={4}>
          <div className="center">
          </div>
        </DatePicker>
      </div>
      <div>
        {isNadal ? (
          <button onClick={() => setNadal(false)} >Nadal</button>
        ) : (
          <DatePicker key={`datePicker_${isNadal}`} selected={toDate} showYearPicker dateFormat="yyyy" onChange={(v: Date) => modifyDateTo(v.getFullYear())} yearItemNumber={4}>
            <div className="center">
              <button onClick={() => {setNadal(true); modifyDateTo()}}>Nadal</button>
            </div>
          </DatePicker>
        )}
      </div>
    </div>
  )
}

type ItemModel = {
  internal_id: string
  yearFrom: number
  yearTo: string | number
  text: string
}

interface ItemInterface {
  item: ItemModel
  index: number
  deleteItem: () => void
  updateItem: (newItemData: ItemModel) => void
  commitChange: () => void
}

const Item: React.FC<ItemInterface> = ({deleteItem, item, index, updateItem, commitChange}) => {
  const [ isEdited, setEdited ] = useState<boolean>(false)
  const toggleEdited = () => setEdited(!isEdited)
  return (
    <div className={["Item"].join(" ")} key={`item__${index}`}>
      {
        isEdited ? (
          <>
            <ItemDate item={item} updateItem={updateItem} />
            <textarea className="Item__abbr" onChange={(v) => updateItem({...item, text: v.target.value})} defaultValue={item.text} />
          </>
        ) : (
          <>
            <div className="Item__date">{item.yearFrom}-{item.yearTo}</div>
            <div className="Item__abbr">
              {item.text}
            </div>
          </>
        )
      }
      <ItemOptions deleteItem={deleteItem} commitChange={commitChange} isEdited={isEdited} toggleEdit={toggleEdited} />
    </div>
  )
}

interface RealizacjePanelInterface {
  createAuthString: () => string
  logout: () => void
}


const RealizacjePanel: React.FC<RealizacjePanelInterface> = ({logout, createAuthString}) => {
  const [ userInput, setUserInput ] = useState<string>('')
  const [ data, setData ] = useState<ItemModel[]>([])
  const doesMatch = (query: string, content: string) => content.toLowerCase().includes(query.toLowerCase())
  const handleResponse = (response: Response) => {
    if(response.status === 200) return response.json()
    logout()
  }

  const fetchData: (language?: string) => void = (language) => {
    fetch(`https://digicos.ddns.net:8001/realizacje/get_all`)
      .then(resource => resource.json())
      .then(data => setData(data))
  }

  const commitChange = (itemId: string, newData: ItemModel) => {
    fetch(`https://digicos.ddns.net:8001/realizacje/update_one/${itemId}`, {method: "PUT", body: JSON.stringify(newData), headers: { Authorization: createAuthString() }})
      .then(resource => resource.json())
      .then(data => console.log(data))
  }


  const deleteItem = (itemId: string) => {
    fetch(`https://digicos.ddns.net:8001/realizacje/delete_one/${itemId}`, {method: "DELETE", headers: { Authorization: createAuthString() }} )
      .then(resource => handleResponse(resource))
      .then(() => fetchData())
  }

  const handleArrayUpdate = (index_to_update: number, newData: ItemModel) => {
    setData(
      data?.map((item, index_of_item) =>
        index_of_item === index_to_update ? newData : item
      )
    )
  }

  const AddItem = () => {
    fetch(`https://digicos.ddns.net:8001/realizacje/create_one`, {method: "POST", body: JSON.stringify({yearFrom: 2001, yearTo: "Nadal", text: "Treść"}), headers: { Authorization: createAuthString() }})
      .then(resource => handleResponse(resource))
      .then(data => { data && fetchData() })
  }

  useEffect(() => fetchData(), [])
  return (
    <div className="RealizacjePanel__component">
      <div className="RealizacjePanel__container">
        <Menu
          setSearchString={(s: string) => setUserInput(s)}
          searchString={userInput}
          AddItem={AddItem}
        />
        <div className="Items__container">
          {data.filter(item => doesMatch(userInput, item.text)).map((item, index) => {
            return (
              <Item
                item={item}
                key={`item_${index}`}
                index={index}
                deleteItem={() => deleteItem(item.internal_id)}
                updateItem={(newItemData: ItemModel) => handleArrayUpdate(index, newItemData)}
                commitChange={() => commitChange(item.internal_id, item)}/>
            )})}
        </div>
      </div>
    </div>
  )
}

export default RealizacjePanel
