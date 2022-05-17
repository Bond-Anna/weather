import { FC, useEffect } from 'react'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import Autocomplete from 'react-google-autocomplete'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import 'utils/i18n'
import citys from './store/citys'
import Card from './Card/Card'
import LangDrop from './LangDrop'
import styles from './styles.module.scss'

const Weather: FC = observer(() => {
  const { t } = useTranslation()
  const [autocomplete, setAutocomplete] = useState<string>('')

  const getWeather = (name: string): void => {
    citys.getCityWeather(name)
    setAutocomplete('')
  }

  useEffect(() => {
    if (!localStorage.getItem('geo')) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        citys.myGeo({ latitude, longitude })
      })
    }
    // citys.setCity(JSON.parse(localStorage.getItem('city-data')) || [])
    const storageDate = localStorage.getItem('city-data')
    if (storageDate !== null) {
      citys.setCity(JSON.parse(storageDate))
    } else {
      citys.setCity([])
    }
    // @ts-ignore
    citys.setLanguage(JSON.parse(localStorage.getItem('is-he')) || false)
  }, [])

  return (
    <div className={cn(styles.container, { [styles.direction]: citys.isHe })}>
      <div className={styles.dropdown}>
        <LangDrop />
      </div>
      <div className={styles.input}>
        <Autocomplete
          placeholder={`${t('placeholder')}..`}
          // @ts-ignore
          value={autocomplete}
          apiKey="AIzaSyA9bslaj5Bl5nLuQQXe8rr_PkhDvvZqzMs"
          onPlaceSelected={place => {
            getWeather(place.address_components[0].long_name)
          }}
          onChange={(e: any) => setAutocomplete(e.target.value)}
        />
      </div>
      <div className={styles.cardList}>
        {citys.citysData.map(({ city, list }) => (
          <Card key={city.id} city={city} list={list!} />
        ))}
      </div>
    </div>
  )
})
export default Weather
