import { FC, useEffect } from 'react'
import { useState } from 'react'
import { useStore } from 'stores'
import { observer } from 'mobx-react-lite'
import Autocomplete from 'react-google-autocomplete'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import 'utils/i18n'
// components
import Card from './Card/Card'
import LangDrop from './LangDrop'
import Forms from './Forms'
// styles
import styles from './styles.module.scss'

const Weather: FC = observer(() => {
  const { t } = useTranslation()
  const [autocomplete, setAutocomplete] = useState<string>('')
  const [isForm, setIsForm] = useState<boolean>(false)
  const { cityStore } = useStore()

  const getWeather = (name: string): void => {
    cityStore.getCityWeather(name)
    setAutocomplete('')
  }

  useEffect(() => {
    const myCoord = localStorage.getItem('myCoord')
    if (myCoord !== null) {
      const coord = JSON.parse(myCoord)

      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        if (
          Math.trunc(coord.latitude) !== Math.trunc(latitude) ||
          Math.trunc(coord.longitude) !== Math.trunc(longitude)
        ) {
          cityStore.myGeo({ latitude: latitude, longitude: longitude })
        }
        return
      })
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        cityStore.myGeo({ latitude, longitude })
      })
    }

    const getSavedWeather = async () => {
      const citiesNames = localStorage.getItem('cities-names')
      if (citiesNames) {
        const parsedCitiesNames: string[] = JSON.parse(citiesNames)
        await parsedCitiesNames.map(name => cityStore.getCityWeather(name))
      }
    }

    const storageLang = localStorage.getItem('is-he')
    if (storageLang !== null) {
      cityStore.setLanguage(JSON.parse(storageLang) || false)
    }
    Promise.all([getSavedWeather()])
  }, [])

  useEffect(() => {
    if (cityStore.isHe === true) {
      document.querySelector('body')!.style.direction = 'rtl'
    } else {
      document.querySelector('body')!.style.direction = 'ltr'
    }
  }, [cityStore.isHe])

  const handlerFormsBtn = () => {
    setIsForm(!isForm)
  }

  return (
    <div className={cn(styles.container)}>
      <button onClick={handlerFormsBtn}>Forms</button>
      <div className={isForm ? styles.formsShown : styles.forms}>
        <Forms />
      </div>
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
        {cityStore.citiesData.map(({ city, list }) => (
          <Card key={city.id} city={city} list={list!} />
        ))}
      </div>
    </div>
  )
})
export default Weather
