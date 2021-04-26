import './Realizacje.scss'

const data = [
  {
    "time": "2009-nadal",
    "desc": "Prace projektowe i wykonawcze linii światłowodowych dla potrzeb PTC Sp. z o.o. dla Biur Regionalnych Katowice i Warszawa"
  },
  {
    "time": "2009-nadal",
    "desc": "Prace remontowe budowlane i elektryczne obiektów na terenie ZAK S.A. (Kędzierzyn-Koźle)"
  },
  {
    "time": "2001-nadal",
    "desc": "Prace remontowe na obiektach PTC Sp. z o.o. w zakresie budowlanym i elektrycznym"
  },
  {
    "time": "2001-nadal",
    "desc": "Prace przy realizacji centrów handlowych, biurowych, hoteli i innych obiektów kubaturowych w zakresie infrastruktury telekomunikacyjnej"
  },
  {
    "time": "2001-nadal",
    "desc": "Prace remontowe na obiektach PTC Sp. z o.o. w zakresie budowlanym i elektrycznym"
  },
  {
    "time": "2001-nadal",
    "desc": "Prace przy realizacji centrów handlowych, biurowych, hoteli i innych obiektów kubaturowych w zakresie infrastruktury telekomunikacyjnej"
  },
  {
    "time": "1999-nadal",
    "desc": "Przeglądy budowlano – elektryczne i konserwacja obiektów dla PTC Sp. z o.o."
  },
  {
    "time": "1999-nadal",
    "desc": "Bieżące utrzymanie stacji bazowych telefonii komórkowej – wykonywanie zasilań awaryjnych, zabezpieczanie obiektów itp."
  },
  {
    "time": "1999-nadal",
    "desc": "Przeglądy budowlano – elektryczne i konserwacja obiektów dla PTC Sp. z o.o."
  },
  {
    "time": "1999-nadal",
    "desc": "Bieżące utrzymanie stacji bazowych telefonii komórkowej – wykonywanie zasilań awaryjnych, zabezpieczanie obiektów itp."
  },
]


export default function Realizacje() {
    return (
        <div className="Realizacje__component">
            <div className="bg" />
            <div className="Realizacje__Container container">
                {data.map((item, index) => {
                    return (
                    <div key={index} className="box">
                        <div className="time">
                            <p>{item.time}</p>
                        </div>
                        <div className="desc">
                            <p>{item.desc}</p>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}