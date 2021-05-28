export type FileContentModel = {
  alt?: string
  cont: any
}

export type textContentModel = {
  cont: string
}

export type linkContentModel = {
  text: string
  href?: string
}

export type subItemModel = {
  typee: string
  cont: textContentModel | linkContentModel | FileContentModel
}

export type ItemModel = {
  date: string
  title: string
  internal_id: string
  content: subItemModel[]
  language: string
}
export interface ItemInterface {
  item: ItemModel
  language: string
}

