import './RealizacjePanel.scss'
import { useState, useEffect, useRef } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const itemData = [
  {
    time: "2009-nadal",
    desc: "Prace projektowe i wykonawcze linii światłowodowych dla potrzeb PTC Sp. z o.o. dla Biur Regionalnych Katowice i Warszawa"
  },
  {
    time: "2009-nadal",
    desc: "Prace remontowe budowlane i elektryczne obiektów na terenie ZAK S.A. (Kędzierzyn-Koźle)"
  },
  {
    time: "2001-nadal",
    desc: "Prace remontowe na obiektach PTC Sp. z o.o. w zakresie budowlanym i elektrycznym"
  },
  {
    time: "2001-nadal",
    desc: "Prace przy realizacji centrów handlowych, biurowych, hoteli i innych obiektów kubaturowych w zakresie infrastruktury telekomunikacyjnej"
  },
  {
    time: "2001-nadal",
    desc: "Prace remontowe na obiektach PTC Sp. z o.o. w zakresie budowlanym i elektrycznym"
  },
  {
    time: "2001-nadal",
    desc: "Prace przy realizacji centrów handlowych, biurowych, hoteli i innych obiektów kubaturowych w zakresie infrastruktury telekomunikacyjnej"
  },
  {
    time: "1999-nadal",
    desc: "Przeglądy budowlano – elektryczne i konserwacja obiektów dla PTC Sp. z o.o."
  },
  {
    time: "1999-nadal",
    desc: "Bieżące utrzymanie stacji bazowych telefonii komórkowej – wykonywanie zasilań awaryjnych, zabezpieczanie obiektów itp."
  },
  {
    time: "1999-nadal",
    desc: "Przeglądy budowlano – elektryczne i konserwacja obiektów dla PTC Sp. z o.o."
  },
  {
    time: "1999-nadal",
    desc: "Bieżące utrzymanie stacji bazowych telefonii komórkowej – wykonywanie zasilań awaryjnych, zabezpieczanie obiektów itp."
  },
]






interface SearchMenuInterface {
  setSearchString: (s: string) => void
  searchString: string
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
  updateItem: (newItemData: ItemModel) => void
  commitChange: () => void
}

interface RealizacjePanelInterface {
  askBeforeDo: (fn: () => void) => void
}

const Menu: React.FC<SearchMenuInterface> = ({setSearchString, searchString}) => {
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
    </div>
  )
}

interface ItemOptionsInterface {
  isEdited: boolean
  toggleEdit: () => void
  commitChange: () => void
}

const ItemOptions: React.FC<ItemOptionsInterface> = ({isEdited, toggleEdit, commitChange}) => {
  return (
    <div className="Item__options">
      {
      isEdited ? (
          <div onClick={() => {toggleEdit(); commitChange()}}>Zapisz</div>
        ) : (
          <div onClick={() => toggleEdit()}>Edytuj</div>
        ) 
      }
      <div>Usuń</div>
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

const Item: React.FC<ItemInterface> = ({item, index, updateItem, commitChange}) => {
  const [ isEdited, setEdited ] = useState<boolean>(false)
  const toggleEdited = () => setEdited(!isEdited)
  return (
    <div className="Item" key={`item__${index}`}>
      {
        isEdited ? (
          <>
            <ItemDate item={item} updateItem={updateItem} />
            <textarea className="Item__abbr" onChange={(v) => updateItem({...item, text: v.target.value})} defaultValue={item.text} />
          </>
        ) : (
          <>
            <div className="Item__date">{item.yearFrom}-{item.yearTo}</div>
            <div className="Item__abbr">{item.text}</div>
          </>
        )
      }
      <ItemOptions commitChange={commitChange} isEdited={isEdited} toggleEdit={toggleEdited} />
    </div>
  )
}


const RealizacjePanel: React.FC<RealizacjePanelInterface> = ({askBeforeDo}) => {
  const [ userInput, setUserInput ] = useState('')
  const [ data, setData ] = useState<ItemModel[]>()
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData: (language?: string) => void = (language) => {
    fetch(`http://digicos.ddns.net:8003/realizacje/get_all`)
      .then(resource => resource.json())
      .then(data => setData(data))
  }

  const commitChange = (itemId: string, newData: ItemModel) => {
    console.log(newData)
    console.log(JSON.stringify(newData))
    fetch(`http://digicos.ddns.net:8003/realizacje/update_one/${itemId}`, {method: "PUT", body: JSON.stringify(newData)})
      .then(resource => resource.json())
      .then(data => console.log(data))
  }

  const handleArrayUpdate = (index_to_update: number, newData: ItemModel) => {
    setData(
      data?.map((item, index_of_item) => 
        index_of_item === index_to_update ? newData : item
      )
    )
  }
  console.log(data)
  const doesMatch = (query: string, content: string) => content.toLowerCase().includes(query.toLowerCase())

  return (
    <div className="RealizacjePanel__component">
      <div className="RealizacjePanel__container">
        <Menu
          setSearchString={(s: string) => setUserInput(s)} 
          searchString={userInput}
        />
        <div className="Items__container">
          {data && data.filter(item => doesMatch(userInput, item.text)).map((item, index) => {
            return (
              <Item 
                item={item} 
                key={`item_${index}`}
                index={index} 
                updateItem={(newItemData: ItemModel) => handleArrayUpdate(index, newItemData)}
                commitChange={() => commitChange(item.internal_id, item)}/>
            )})}
        </div>
      </div>
    </div>
  )
}

export default RealizacjePanel