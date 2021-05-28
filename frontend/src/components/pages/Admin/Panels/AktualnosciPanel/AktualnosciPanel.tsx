import { useState, useContext, useEffect } from "react"
import settingsContext from "../../../../SettingsContext"
import { ItemModel } from "../../../Aktualnosci/AktualnosciTypes"
import "./AktualnosciPanel.scss"

const useForceUpdate = () => {
  const [ value ,setValue ] = useState<number>(0)
  console.log(value)
  return () => setValue(v => v + 1)
}

interface cardOptionsInterface {
  pushItemUpdate: () => void,
  deleteItem: () => void,
  editedState: [
    currentState: boolean,
    setStateFunction: (newState: boolean) => void
  ]
}

interface cardTitleInteface {
  title: string
  isEdited: boolean | undefined
  changeTitle: (newTitle: string) => void
}

const CardTitle: React.FC<cardTitleInteface> = ({title, isEdited, changeTitle}) => {
  return (
		<div className="Card__title">
			{isEdited ? (
				<div>
					<div>Tytuł:</div>
					<textarea className="Card__title indented lighter" onChange={(e) => changeTitle(e.target.value)} defaultValue={title}></textarea>
				</div>
			) : (
				<div>
					<div>Tytuł:</div>
					<div className="Card__title indented lighter">{title}</div>
				</div>
			)}
		</div>
	)
}

const CardOptions: React.FC<cardOptionsInterface> = ({editedState, pushItemUpdate, deleteItem}) => {
  const [ isEdited, setEdited ] = editedState
  const handleEditClick = () => {
    isEdited && pushItemUpdate()
    setEdited(!isEdited)
  }
	return (
		<div className="Card__options__container">
			{isEdited ?
        <div className="Card__options__item" onClick={() => handleEditClick()}>Zapisz</div>
			:
				<div className="Card__options__item" onClick={() => handleEditClick()}>Edytuj</div>
			}
      <div className="Card__options__item" onClick={() => deleteItem()}>Usuń</div>
		</div>
	)
}

type InnerLinkModel = {
  text: string | number
  href: string
}

type InnerFileModel = {
  cont: any
  alt: string
}

type cardInnerContentModel = {
  typee: string,
  cont: string | InnerLinkModel | InnerFileModel | any
}


const InnerContentFile: React.FC<{setContent: (swap: InnerFileModel) => void, current: cardInnerContentModel}> = ({setContent, current}) => {
  useEffect(() => {
    if(current.typee !== "file")
    setContent({cont: null, alt: ""})
  }, [setContent, current.typee])
  return (
    <div className="indented lighter">
      file <input  className="Input__file" type="file"/><br />
      alt <input className="" type="text"/>
    </div>
  )
}

const InnerContentText: React.FC<{current: cardInnerContentModel, setContent: (swap: string) => void}> = ({current, setContent}) => {
  useEffect(() => {
    if(current.typee !== "text") {
      setContent("")
    }
  }, [setContent, current.typee])
  return (
    <textarea 
      name={current.cont}
      className="indented lighter InnerContentTextarea" 
      onChange={(e) => setContent(e.target.value)} 
      value={current.cont} 
      />
  )
}

const InnerContentLink: React.FC<{current: cardInnerContentModel, setContent: (swap: InnerLinkModel) => void}> = ({current, setContent}) => {
  useEffect(() => {
    if(current.typee !== "link") {
      setContent({text: "", href: ""})
    }
  }, [setContent, current.typee])
  return (
    <div className="indented lighter">
      <div>
        text 
        <input 
          className="indented" 
          type="text" 
          onChange={(v) => setContent({...current.cont, text: v.target.value})} 
          defaultValue={current.cont.text}/>   
      </div> 
      <div>
        link 
        <input 
          className="indented lighter" 
          type="text" 
          onChange={(v) => setContent({...current.cont, href: v.target.value})} 
          defaultValue={current.cont.href}/>
      </div>
    </div>
  )
}

interface InnerContentOptionsInterface {
  verticalPosition: verticalPosition
  removeItem: () => void
  move: (direction: verticalDirection) => void
}

const InnerContentOptions: React.FC<InnerContentOptionsInterface> = ({verticalPosition, removeItem, move}) => {
  return (
    <div className="InnerContent__Item__Options">
      {verticalPosition !== "First" && 
        <div onClick={() => move("Up")}>Up</div>
      }
      <div onClick={() => removeItem()}>
        Remove
      </div>
      {verticalPosition !== "Last" && 
        <div onClick={() => move("Down")}>Down</div>
      }
    </div>
  )
}

type verticalPosition = "First" | "Last" | "Center"
type verticalDirection = "Up" | "Down"

interface cardInnerContentInterface {
  innerItemData: cardInnerContentModel
  verticalPosition: verticalPosition
  isEdited: boolean | undefined
  editSubItem: (newObject: object) => void
  removeItem: () => void
  move: (direction: verticalDirection) => void
}

const InnerContent: React.FC<cardInnerContentInterface> = ({innerItemData, isEdited, editSubItem, verticalPosition, removeItem, move}) => {
  const updateItem = (newData: any) => editSubItem({...innerItemData, ...newData})
	return (
		<div className="indented">
			{isEdited ? (
				<div className="InnerContent__Item__Container">
          <div className="InnerContent__Item__Content">
            <select onChange={(e) => updateItem({typee: e.target.value})} value={innerItemData.typee}>
              <option value="text">text</option>
              <option value="file">file</option>
              <option value="link">link</option>
            </select>
            <div>
              {{
                "text": <InnerContentText current={innerItemData} setContent={(swap: string) => updateItem({typee: "text", cont: swap})}/>,
                "file": <InnerContentFile current={innerItemData} setContent={(swap: InnerFileModel) => updateItem({typee: "file", cont: swap})}/>,
                "link": <InnerContentLink current={innerItemData} setContent={(swap: InnerLinkModel) => updateItem({typee: "link", cont: swap})}/>
              }[innerItemData.typee]}
            </div>
          </div>
          <InnerContentOptions verticalPosition={verticalPosition} removeItem={() => removeItem()} move={move} />
        </div>
			) : (
        <div className="indented">
        {{
          "text":
            <div>
              <div className="">{innerItemData.typee}:</div>
              <div className="indented lighter">{innerItemData.cont}</div>
            </div>
          ,
          "file": 
            <div>
              <div className="">{innerItemData.typee}:</div>
              <div className="indented lighter">{innerItemData.cont}</div>
            </div>
          ,
          "link": 
            <div>
              <div className="">{innerItemData.typee}:</div>
              <div className="indented lighter">text: {innerItemData.cont.text}</div>
              <div className="indented lighter">href:  <a href={innerItemData.cont.href}>{innerItemData.cont.href}</a></div>
            </div>
        }[innerItemData.typee]}
				</div>
			)}
      <hr />
		</div>
	)
}



type aktualnosciItemModel = {
  internal_id: string,
  title: string,
  date: string,
  language: string
  content: cardInnerContentModel[]
}

interface InnerContentListInterface {
  changeInnerContent: (newData: cardInnerContentModel[]) => void
  innerContent: cardInnerContentModel[]
  isEdited: boolean
}


const InnerContentList: React.FC<InnerContentListInterface> = ({innerContent, isEdited, changeInnerContent}) => {
  /*
    For each element of item,
    check if element's index is equal to the edited element
    if it is then save new item to new array
    else save old item to new array
    returns object {content: Array}
  */
  const handleArrayUpdate: (newData: cardInnerContentModel, index_to_update: number) => void = (newItem, index_to_update) => {
    changeInnerContent(
      innerContent.map((oldItem, subIndex) => subIndex === index_to_update ? newItem : oldItem)
    )
  }
  /*
    Create new Array containg all the items from old Array + one default {text: "text", cont: "text"}
  */
  const newArrayItem = () => {
    const defaultItem = {typee: "text", cont: "text"}
    changeInnerContent([...innerContent, defaultItem])
  }

  const removeItem = (indexToUpdate: number) => {
    changeInnerContent(
      innerContent.filter((oldItem, subIndex) => subIndex !== indexToUpdate && oldItem)
    )
  }

  const forceUpdate = useForceUpdate()
  
  const swapItems = (index1: number, index2: number) => {
    console.log(index1, index2)
    const temp = innerContent[index1]
    innerContent[index1] = innerContent[index2]
    innerContent[index2] = temp
    forceUpdate()
  }

  

  const moveVertically = (index: number, direction: verticalDirection) => 
    swapItems(
      index, 
      {
        "Up": index-1, 
        "Down": index+1
      }[direction]
    )

  const determinePosition = (lengthOfContentArray: number, subIndex: number) => {
    if (subIndex == 0) {
      return "First"
    }
    if (subIndex == lengthOfContentArray-1) {
      return "Last"
    }
    return "Center"
  }

  return (
    <div className="Card__Inner">Zawartość:
      {innerContent.map((subItem, subIndex) => {
        return (
          <InnerContent
            key={`subitem_${subIndex}`}
            innerItemData={subItem}
            isEdited={isEdited}
            editSubItem={(newItem: any) => handleArrayUpdate(newItem, subIndex)}
            verticalPosition={determinePosition(innerContent.length, subIndex)}
            removeItem={() => removeItem(subIndex)}
            move={(direction: verticalDirection) => moveVertically(subIndex, direction)}
          />
        )
      })}
      {isEdited &&
        <div className="add_btn" onClick={() => newArrayItem()}>Dodaj więcej</div>
      }
    </div>
  )
}

interface aktualnosciItemInterface {
  itemData: aktualnosciItemModel
  commitItemUpdate: () => void
  deleteItem: () => void
  editItem: (newObject: aktualnosciItemModel) => void
  card_index: number
}

const AktualnosciItem: React.FC<aktualnosciItemInterface> = ({itemData, editItem, commitItemUpdate, deleteItem, card_index}) => {
	const [ isEdited, setEdited ] = useState<boolean>(false)
	return (
		<div className="Aktualnosci__card__container">
			<CardOptions editedState={[ isEdited, setEdited ]} pushItemUpdate={commitItemUpdate} deleteItem={deleteItem}/>
			<div className="Card__content__container">
				<div className="Card__content">
					<CardTitle 
            title={itemData.title} 
            isEdited={isEdited} 
            changeTitle={(newTitle: string) => editItem({...itemData, title: newTitle})}
          />
					<InnerContentList 
            innerContent={itemData.content} 
            isEdited={isEdited}
            changeInnerContent={(newInnerData: cardInnerContentModel[]) => editItem({...itemData, content: newInnerData})}
          />
				</div>
			</div>
		</div>
	)
}

interface AktualnosciPanelInterface {
 logout: () => void
 createAuthString: () => string
}

const AktualnosciPanel: React.FC<AktualnosciPanelInterface> = ({logout, createAuthString}) => {
	const [ data, setData ] = useState<aktualnosciItemModel[]>([])
  const initialLanguage = useContext(settingsContext).language
  const [ language, setLanguage ] = useState<string>(initialLanguage)

  const handleResponse = (response: Response) => {
    if(response.status === 401) {
      logout()
      return
    }
    return response.json()
  }
  const fetchData: (language: string) => void = () => {
    fetch(`https://digicos.ddns.net:8001/aktualnosci/get_all`)
      .then(resource => resource.json())
      .then(data => setData(data))
  }
  const putData = (updatedItem: aktualnosciItemModel) => {
    fetch(`https://digicos.ddns.net:8001/aktualnosci/update_one/${updatedItem.internal_id}`, {method: "PUT", body: JSON.stringify(updatedItem), headers: { Authorization: createAuthString() } })
      .then(resource => handleResponse(resource))
      .then(() => fetchData(language))
  }
  const deleteData = (updatedItem: aktualnosciItemModel) => {
      fetch(`https://digicos.ddns.net:8001/aktualnosci/delete_one/${updatedItem.internal_id}`, {method: "DELETE", headers: { Authorization: createAuthString() }})
        .then(resource => handleResponse(resource))
        .then(() => fetchData(language))
  }
  const createItem = (language: string) => {
    fetch(`https://digicos.ddns.net:8001/aktualnosci/create_one/${language}`, {method: "GET", headers: { Authorization: createAuthString() }})
      .then(resource => handleResponse(resource))
      .then(() => fetchData(language))
}
	useEffect(() => {
    fetchData(language)
	}, [language])

  /*
    For each element of item,
    check if element's index is equal to the edited element
    if it is then save new item to new array
    else save old item to new array
    returns null
  */
  const handleArrayUpdate = (index_to_update: number, newData: aktualnosciItemModel) => {
    setData(
      data.map((item, index_of_item) =>
        index_of_item === index_to_update ? newData : item
      )
    )
  }
	return (
    <>
      <div>
        <div>Set Language</div>
        <div>
          <button onClick={() => setLanguage('Polish')}>Polski</button>
          <button onClick={() => setLanguage('English')}>Anglielski</button>
        </div>
      </div>
      <button onClick={() => createItem(language)}>create item</button>
      <div className="Aktualnosci__container_n">
        {data.filter(item => item.language === language).map((item, index) => {
          return (
            <AktualnosciItem
              key={"aktualnosci_"+index}
              itemData={item}
              deleteItem={() => deleteData(item)}
              commitItemUpdate={() => putData(item)}
              editItem={(newData: aktualnosciItemModel) => handleArrayUpdate(index, newData)}
              card_index={index}
            />
          )
        })}
      </div>
    </>
	)
}

export default AktualnosciPanel
