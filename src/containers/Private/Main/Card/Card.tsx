import { useState } from 'react'
import { useStore } from 'stores'
import cn from 'classnames'
import * as dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'
import 'utils/i18n'
import Cross from 'sources/common/cross'
import MyResponsiveLine from '../Graph'
import { ListEntity, City } from 'types/City'
import styles from './styles.module.scss'

type Result = {
  x: string
  y: number
}

export default function Card({ city, list }: { city: City; list: ListEntity[] }) {
  const { t } = useTranslation()
  const [isCel, setIsCel] = useState(() => list[0].main.flag_isCelsius)
  const { cityStore } = useStore()

  const date = dayjs.unix(list[0].dt).format('ddd, D MMM, HH:mm')
  const iconS = list[0].weather && list[0].weather[0].icon
  const link = `http://openweathermap.org/img/wn/${iconS}@2x.png`

  const graphData: any[] = [{ id: uuidv4(), color: 'hsl(23, 70%, 50%)', data: [] }]

  const result: Result[] = list.map((el: any) => {
    const dt = dayjs.unix(el.dt).format('DD.MM')
    return { x: dt, y: el.main.flag_isCelsius ? el.main.tempC : el.main.tempF }
  })

  const arrayY = result.map(res => res.y)
  const maxY = Math.max(...arrayY)
  const minY = Math.min(...arrayY)

  graphData[0].data = result

  const onBtnC = () => {
    cityStore.editCity({ isCel: true, id: city.id })
    setIsCel(true)
  }

  const onBtnF = () => {
    cityStore.editCity({ isCel: false, id: city.id })
    setIsCel(false)
  }

  return (
    <div
      className={cn(styles.card, {
        [styles.worm]: list[0].main.tempC! > 0,
        [styles.cold]: list[0].main.tempC! <= 0,
        [styles.direction]: cityStore.isHe,
      })}
    >
      <div className={styles.topInfo}>
        <div className={styles.location}>
          {city.name}, {city.country}
        </div>
      </div>
      <div className={cn(styles.weather, { [styles.weatherHe]: cityStore.isHe })}>
        <img src={link} alt="icon" />
        {list[0].weather && list[0].weather[0].main}
      </div>
      <p className={styles.date}>{date}</p>
      <div className={styles.graph}>
        <MyResponsiveLine
          data={graphData}
          maxY={maxY}
          minY={minY}
          colorA={list[0].main.tempC! > 0 ? '#FFA25B' : '#5B8CFF'}
          colorB={list[0].main.tempC! > 0 ? '#FFF4F4' : '#FFF4F4'}
        />
      </div>
      <div className={styles.bottomInfo}>
        <div>
          <div className={styles.bottomInfoTemperature}>
            <span className={styles.degrees}>
              {isCel ? `${list[0].main.tempC}` : `${list[0].main.tempF}`}
            </span>
            <div className={styles.units}>
              <button
                className={cn(
                  styles.celsius,
                  { [styles.active]: isCel },
                  { [styles.celsiusHe]: cityStore.isHe }
                )}
                onClick={onBtnC}
              >
                °C
              </button>
              <button
                className={cn(
                  styles.fahrenheit,
                  { [styles.active]: !isCel },
                  { [styles.fahrenheitHe]: cityStore.isHe }
                )}
                onClick={onBtnF}
              >
                °F
              </button>
            </div>
          </div>
          <p className={styles.feels}>
            {t('feels_like')}:{' '}
            <span>{isCel ? `${list[0].main.feelsC} °C` : `${list[0].main.feelsF} °F`}</span>
          </p>
        </div>
        <ul className={styles.bottomInfoPrecipitation}>
          <li>
            {t('wind')}:{' '}
            <span
              className={cn(styles.worm, {
                [styles.cold]: list[0].main.tempC! <= 0,
              })}
            >
              {list[0].wind.speed} m/s
            </span>
          </li>
          <li>
            {t('humidity')}:{' '}
            <span
              className={cn(styles.worm, {
                [styles.cold]: list[0].main.tempC! <= 0,
              })}
            >
              {list[0].main.humidity} %
            </span>
          </li>
          <li>
            {t('pressure')}:{' '}
            <span
              className={cn(styles.worm, {
                [styles.cold]: list[0].main.tempC! <= 0,
              })}
            >
              {list[0].main.pressure} Pa
            </span>
          </li>
        </ul>
      </div>
      <Cross
        trigger={() => cityStore.delCity(city.id, city.name)}
        className={cn(styles.iconCross, { [styles.iconCrossHe]: cityStore.isHe })}
      />
    </div>
  )
}
