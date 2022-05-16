import { FC, useEffect } from 'react'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import Autocomplete from 'react-google-autocomplete'
import citys from './store/citys'
import Card from './Card/Card'
import LangDrop from './LangDrop'
import styles from './styles.module.scss'

const Weather: FC = observer(() => {
  const [autocomplete, setAutocomplete] = useState<string>('')

  const getWeather = (name: string): void => {
    citys.getCityWeather(name)
    // @ts-ignore
    setAutocomplete('')
  }

  useEffect(() => {
    if (!localStorage.getItem('geo')) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        citys.myGeo({ latitude, longitude })
      })
    }
    // @ts-ignore
    citys.setCity(JSON.parse(localStorage.getItem('city-data')) || [])
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.dropdown}>
        <LangDrop />
      </div>
      <div className={styles.input}>
        <Autocomplete
          placeholder="City.."
          // @ts-ignore
          value={autocomplete}
          apiKey="AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs"
          onPlaceSelected={(place, autocomplete) => {
            // @ts-ignore
            setAutocomplete(autocomplete)
            getWeather(place.address_components[0].long_name)
          }}
          onChange={(e: any) => setAutocomplete(e.target?.value)}
        />
      </div>
      <div className={styles.cardList}>
        {/* @ts-ignore */}
        {citys.citysData.map(({ city, list }) => (
          // @ts-ignore
          <Card key={city.id} city={city} list={list} />
        ))}
      </div>
    </div>
  )
})
export default Weather
