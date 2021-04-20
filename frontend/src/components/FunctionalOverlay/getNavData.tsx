export interface navItemModel {
  name: string
  to: string
}

const getNavData: (language: string) => navItemModel[] | undefined = (language) => {
	return {
		"Polish" : [
			{name: "Firma", to: "/#firma"},
			{name: "Oferta", to: "/#oferta"},
			{name: "Realizacje", to: "/realizacje"},
			{name: "Kontakt", to: "/kontakt"},
			//{name: "Kariera", to: "/kariera"},
			{name: "Inwestorzy", to: "/inwestorzy"},
			{name: "Aktualnosci", to: "/aktualnosci"}
		],
		"English" : [
			{name: "Company", to: "/#firma"},
			{name: "Offer", to: "/#oferta"},
			{name: "Realizations", to: "/realizacje"},
			{name: "Contact", to: "/kontakt"},
			//{name: "Career", to: "/kariera"},
			{name: "Investors", to: "/inwestorzy"},
			{name: "News", to: "/aktualnosci"}
		]
	}[language]   
}

export default getNavData