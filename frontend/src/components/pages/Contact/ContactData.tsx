interface Oddzial {
  id: number, 
  nazwa: string, 
  glowny: boolean,
  map_url: string
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
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d542.6409244136885!2d18.258975252375823!3d50.2957954106221!2m3!1f0!2f39.30587493119293!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x4711140801baac75%3A0x344a6cf36ab2d6d7!2sDigicos%20S.A.!5e1!3m2!1sen!2spl!4v1619960621358!5m2!1sen!2spl",
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
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214.82098314899486!2d16.843707978281596!3d52.391990854178864!2m3!1f0!2f39.44454354783553!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x4704450468a50723%3A0x9231aa158ad14a10!2sDigicos%20S.A.%20o%2F%20Pozna%C5%84!5e1!3m2!1sen!2spl!4v1619960750315!5m2!1sen!2spl",
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
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d542.6409244136885!2d18.258975252375823!3d50.2957954106221!2m3!1f0!2f39.30587493119293!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x4711140801baac75%3A0x344a6cf36ab2d6d7!2sDigicos%20S.A.!5e1!3m2!1sen!2spl!4v1619960621358!5m2!1sen!2spl",
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
      map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d288.50516830023844!2d18.527754400481978!3d54.21306009494618!2m3!1f0!2f39.36766412454468!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x46fd7b5ce1d75bc9%3A0x6c099441b46c2d48!2sDigicos%20S.A.%20o%2FGdynia!5e1!3m2!1sen!2spl!4v1619960840146!5m2!1sen!2spl",
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
      map_url: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d746.8614391446655!2d21.131073604532716!3d52.23600678476115!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471934ab2013c045%3A0x3249bc16ae6fd534!2sDigicos%20S.A.%20o%2FWarszawa!5e1!3m2!1sen!2spl!4v1619959876236!5m2!1sen!2spl",
      data: [
        {type: "addr1", value: "ul. Tytoniowa \n 22 04-228 Warszawa"},
        {type: "email", value: "warszawa@digicos.pl"},
        {type: "tel", value: "+48 22 245 26 26"},
      ]
    }
  ]
}

export default getContactData