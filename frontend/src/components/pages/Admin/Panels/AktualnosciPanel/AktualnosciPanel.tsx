import { useState, useContext, useEffect } from "react"
import { motion } from "framer-motion"
import useAuth from "../../useAuth"
import settingsContext from "../../../../SettingsContext"  // lol
import "./AktualnosciPanel.scss"

interface aktualnosciItemInterface {
  itemData: aktualnosciItemData
  editItem: (newObject: aktualnosciItemData) => void
  card_index: number
}

interface aktualnosciItemData {
  internal_id: string,
  title: string,
  date: string,
  content: Array<cardInnerContentData>
}

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

const CardOptions: React.FC<cardOptionsInterface> = ({editedState}) => {
	const [ isEdited, setEdited ] = editedState
	return (
		<div className="Card__options__container">
			{isEdited ? (
				<>
					<div className="Card__options__item" onClick={() => setEdited(false)}>Zapisz</div>
					<div className="Card__options__item">Usuń</div>
				</>
			) : (
				<>
					<div className="Card__options__item" onClick={() => setEdited(true)}>Edytuj</div>
          <div className="Card__options__item">Usuń</div>
				</>
			)}
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






const AktualnosciItem: React.FC<aktualnosciItemInterface> = ({itemData, editItem, card_index}) => {
	const [ isEdited, setEdited ] = useState<Boolean>(false)
  const partialEdit: (newData: any) => void = (newData) => {
    /* 
      Unpack current item,
      The child element doesn't need the whole item state to make changes to it
      returns null 
    */
    editItem({...itemData, ...newData})
  }
  const handleArrayUpdate: (newData: any, index_to_update: number) => void = (newItem, index_to_update) => {
    /* 
      For each element of item,
      check if element's index is equal to the edited element
      if it is then save new item to new array
      else save old item to new array
      returns object {content: Array}
    */
    partialEdit(
      {content: itemData.content.map((oldItem, subIndex) => subIndex === index_to_update ? newItem : oldItem)}
    )
  }
  const newArrayItem = () => {
    /*
      Create new Array containg all the items from old Array + one default {text: "text", cont: "text"}
    */
    const defaultItem = {typee: "text", cont: "text"}
    partialEdit({content: [...itemData.content, defaultItem]})
  }
	return (
		<div className="Aktualnosci__card__container">
			<CardOptions editedState={[ isEdited, setEdited ]} />
			<div className="Card__content__container">
				<div className="Card__content">
					<CardTitle title={itemData.title} isEdited={isEdited} changeTitle={(newTitle: string) => partialEdit({title: newTitle})}/>
					<div className="Card__Inner">Zawartość:
						{itemData.content.map((subItem, subIndex) => {
              console.log(subItem)
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

const AktualnosciPanel: React.FC = () => {
	const settings = useContext(settingsContext)
	const [ data, setData ] = useState<Array<aktualnosciItemData>>([])
	const [ username, ] = settings.userState
	const [ token, ] = settings.tokenState
	const [ ,checkAuthState ] = useAuth()
	useEffect(() => {
		fetch('https://digicos.ddns.net:8001/aktualnosci/get_all')
      .then(resource => resource.json())
      .then(data => setData(data))
	}, [])

  const handleArrayUpdate = (index_to_update: number, newData: aktualnosciItemData) => {
    /* 
      For each element of item,
      check if element's index is equal to the edited element
      if it is then save new item to new array
      else save old item to new array
      returns null
    */
    setData(
      data.map((item, index_of_item) => 
        index_of_item === index_to_update ? newData : item
      )
    )
  }
	return (
		<motion.div variants={settings.pageVariants} initial="hidden" animate="visible" className="Admin__container container_sm">
			<div className="Admin__content">
				<div className="Admin">
					<button onClick={() => checkAuthState()}>test</button>
					<div className="Aktualnosci__container_n">
						{data ? (
							data.map((item, index) => {
								return (
                  <AktualnosciItem 
                    key={"aktualnosci_"+index} 
                    itemData={item} 
                    editItem={(newData: aktualnosciItemData) => handleArrayUpdate(index, newData)} 
                    card_index={index}
                  />
                )
							})
						) : (
							<div>Loading</div>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default AktualnosciPanel