import { useState, useContext, useEffect } from "react"
import settingsContext from "../../../../SettingsContext"
import "./AktualnosciPanel.scss"

interface cardInnerContentInterface {
  innerItemData: cardInnerContentModel
  isEdited: Boolean | undefined
  editSubItem: (newObject: object) => void
}

interface cardOptionsInterface {
  pushItemUpdate: () => void,
  deleteItem: () => void,
  editedState: [
    currentState: Boolean,
    setStateFunction: (newState: Boolean) => void
  ]
}

interface cardTitleInteface {
  title: string
  isEdited: Boolean | undefined
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
  }, [])
  return (
    <div className="indented lighter">
      <div>
      file <input  className="Input__file" type="file"/>
      </div>
      <div>
      alt <input className="" type="text"/>
      </div>
    </div>
  )
}

const InnerContentText: React.FC<{current: cardInnerContentModel, setContent: (swap: string) => void}> = ({current, setContent}) => {
  useEffect(() => {
    if(current.typee !== "text") {
      setContent("")
    }
  }, [])
  return (
    <textarea 
      className="indented lighter" 
      onChange={(e) => {setContent(e.target.value); console.log(current)}} defaultValue={current.cont} 
      />
  )
}

const InnerContentLink: React.FC<{current: cardInnerContentModel, setContent: (swap: InnerLinkModel) => void}> = ({current, setContent}) => {
  useEffect(() => {
    if(current.typee !== "link") {
      setContent({text: "", href: ""})
    }
  }, [])
  return (
    <div className="indented lighter">
      <div>
        text 
        <input className="indented" type="text" onChange={(v) => setContent({...current.cont, text: v.target.value})} defaultValue={current.cont.text}/>   
      </div> 
      <div>
        link 
        <input className="indented lighter" type="text" onChange={(v) => setContent({...current.cont, href: v.target.value})} defaultValue={current.cont.href}/>
      </div>
    </div>
  )
}



const InnerContent: React.FC<cardInnerContentInterface> = ({innerItemData, isEdited, editSubItem}) => {
  const updateItem = (newData: any) => editSubItem({...innerItemData, ...newData})
  console.log(innerItemData, "current")
	return (
		<div className="indented">
			{isEdited ? (
				<div>
					<select className="" onChange={(e) => updateItem({typee: e.target.value})} value={innerItemData.typee}>
						<option value="text">text</option>
						<option value="file">file</option>
						<option value="link">link</option>
					</select>
					<div>
						{
							{
								"text": <InnerContentText current={innerItemData} setContent={(swap: string) => updateItem({typee: "text", cont: swap})}/>,
								"file": <InnerContentFile current={innerItemData} setContent={(swap: InnerFileModel) => updateItem({typee: "file", cont: swap})}/>,
								"link": <InnerContentLink current={innerItemData} setContent={(swap: InnerLinkModel) => updateItem({typee: "link", cont: swap})}/>
							}[innerItemData.typee]
						}
					</div>
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
		</div>
	)
}

interface aktualnosciItemModel {
  internal_id: string,
  title: string,
  date: string,
  language: string
  content: cardInnerContentModel[]
}
interface aktualnosciItemInterface {
  itemData: aktualnosciItemModel
  pushItemUpdate: () => void
  deleteItem: () => void
  editItem: (newObject: aktualnosciItemModel) => void
  card_index: number
}

const AktualnosciItem: React.FC<aktualnosciItemInterface> = ({itemData, editItem, pushItemUpdate, deleteItem, card_index}) => {
	const [ isEdited, setEdited ] = useState<Boolean>(false)
  /*
    Unpack current item,
    The child element doesn't need the whole item state to make changes to it
    returns null
  */
  const partialEdit: (newData: any) => void = (newData) => {
    editItem({...itemData, ...newData})
  }
  /*
    For each element of item,
    check if element's index is equal to the edited element
    if it is then save new item to new array
    else save old item to new array
    returns object {content: Array}
  */
  const handleArrayUpdate: (newData: any, index_to_update: number) => void = (newItem, index_to_update) => {
    partialEdit(
      {content: itemData.content.map((oldItem, subIndex) => subIndex === index_to_update ? newItem : oldItem)}
    )
  }
  /*
    Create new Array containg all the items from old Array + one default {text: "text", cont: "text"}
    Im not yet sure if I prefer the spread operator over concat here
  */
  const newArrayItem = () => {
    const defaultItem = {typee: "text", cont: "text"}
    partialEdit({content: [...itemData.content, defaultItem]})
  }
	return (
		<div className="Aktualnosci__card__container">
			<CardOptions editedState={[ isEdited, setEdited ]} pushItemUpdate={pushItemUpdate} deleteItem={deleteItem}/>
			<div className="Card__content__container">
				<div className="Card__content">
					<CardTitle title={itemData.title} isEdited={isEdited} changeTitle={(newTitle: string) => partialEdit({title: newTitle})}/>
					<div className="Card__Inner">Zawartość:
						{itemData.content.map((subItem, subIndex) => {
              return (
                <InnerContent
                  key={`subitem_${subIndex}`}
                  innerItemData={subItem}
                  isEdited={isEdited}
                  editSubItem={(newData) => handleArrayUpdate(newData, subIndex)}
                  />
              )
						})}
					</div>
          {isEdited &&
            <div className="add_btn" onClick={() => newArrayItem()}>Dodaj więcej</div>
          }
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
    console.log(updatedItem)
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
              pushItemUpdate={() => putData(item)}
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
