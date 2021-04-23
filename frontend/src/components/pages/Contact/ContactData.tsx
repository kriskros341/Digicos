interface Oddzial {
  id: number, 
  nazwa: string, 
  glowny: boolean, 
  data: {
    type: string, 
    value: string
  }[]
}


const getContactData: (language: string) => Oddzial[] = (language) => {
  return [
    {
      id: 1,
      nazwa: "Zarząd",
      glowny: true,
      data: [
        {type: "addr1", value: "ul. Mostowa 30i \n 47-223 Kędzierzyn-Koźle"},
        {type: "email", value: "zarzad@digicos.pl"},
        {type: "tel", value: "+48 77 544 50 81"},
        {type: "fax", value: "+48 77 544 50 82"},
      ]
    },
    {
      id: 2,
      nazwa: "Poznań",
      glowny: true,
      data: [
        {"type": "addr1", "value": "ul. Kamiennogórska \n 22 60-179 Poznań"},
        {"type": "email", "value": "poznan@digicos.pl"},
        {"type": "tel", "value": "+48 61 655 85 55"},
        {"type": "fax", "value": "+48 61 655 85 56"},
      ]
    },
    {
      id: 3,
      nazwa: "Katowice",
      glowny: false,
      data: [
        {type: "addr1", value: "ul. Mostowa 30i \n 47-223 Kędzierzyn-Koźle"},
        {type: "email", value: "katowice@digicos.pl"},
        {type: "tel", value: "+48 77 544 50 81"},
        {type: "fax", value: "+48 77 544 50 82"},
      ]
  },
    {
      id: 4,
      nazwa: "Gdynia",
      glowny: false,
      data: [
        {type: "addr1", value: "ul. Sosnowa 10 \n 83-010 Jagotowo"},
        {type: "email", value: "gdynia@digicos.pl"},
        {type: "tel", value: "+48 58 343 22 82"},
      ]
    },
    {
      id: 5,
      nazwa: "Warszawa",
      glowny: false,
      data: [
        {type: "addr1", value: "ul. Tytoniowa \n 22 04-228 Warszawa"},
        {type: "email", value: "warszawa@digicos.pl"},
        {type: "tel", value: "+48 22 245 26 26"},
      ]
    }
  ]
}

export default getContactData