import { useState, useContext, useEffect } from "react"
import { motion } from "framer-motion"
import settingsContext from "../../../../SettingsContext"  // lol
import "./AktualnosciPanel.scss"

interface cardInnerContentInterface {
  innerItemData: cardInnerContentData
  isEdited: Boolean | undefined
  editSubItem: (newObject: object) => void
}

interface cardInnerContentData {
  typee: string,
  cont: string
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
/*
  Data models end with --data,
  Props schemas end with --interface
*/

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

const InnerContent: React.FC<cardInnerContentInterface> = ({innerItemData, isEdited, editSubItem}) => {
  const updateItem = (newData: any) => editSubItem({...innerItemData, ...newData})
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
								"text": <textarea className="indented lighter" onChange={(e) => updateItem({cont: e.target.value})} defaultValue={innerItemData.cont} />,
								"file": <input type="file" className="indented lighter"/>,
								"link": <input type="text" className="indented lighter" onChange={(e) => updateItem({cont: e.target.value})} defaultValue={innerItemData.cont} />
							}[innerItemData.typee]
						}
					</div>
				</div>
			) : (
				<div className="indented">
					<div className="">{innerItemData.typee}:</div>
					<div className="indented lighter">{innerItemData.cont}</div>
				</div>
			)}
		</div>
	)
}

interface aktualnosciItemModel {
  internal_id: string,
  title: string,
  date: string,
  content: Array<cardInnerContentData>
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

const AktualnosciPanel: React.FC<{askBeforeDo: (fn: () => void) => void}> = ({askBeforeDo}) => {
	const settings = useContext(settingsContext)
	const [ data, setData ] = useState<Array<aktualnosciItemModel>>([])
  const [ language, setLanguage ] = useState<string>('')

  const fetchData: (language?: string) => void = (language) => {
    fetch(`https://digicos.ddns.net:8001/aktualnosci/get_all?language=${language || "any"}`)
      .then(resource => resource.json())
      .then(data => setData(data))
  }
  const putData = (updatedItem: aktualnosciItemModel) => {
    askBeforeDo(() =>
      fetch(`https://digicos.ddns.net:8001/aktualnosci/update_one/${updatedItem.internal_id}`, {method: "PUT", body: JSON.stringify(updatedItem) })
        .then(resource => resource.json())
        .then(() => fetchData(language))
    )
  }
  const deleteData = (updatedItem: aktualnosciItemModel) => {
    askBeforeDo(() =>
      fetch(`https://digicos.ddns.net:8001/aktualnosci/delete_one/${updatedItem.internal_id}`, {method: "DELETE"})
        .then(resource => resource.json())
        .then(() => fetchData(language))
    )
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
          <button onClick={() => setLanguage('')}>Brak Selekcji</button>
        </div>
      </div>
      <button onClick={() => {}}>test</button>
      <div className="Aktualnosci__container_n">
        {data?.map((item, index) => {
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
