import React, { useState } from 'react'
import cn from 'classnames'
import * as dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import citys from '../store/citys'
import Cross from 'sources/common/cross'
import MyResponsiveLine from '../Graph'
import styles from './styles.module.scss'

export default function Card({ city, list }: { city: Object; list: any }) {
  const [isCel, setIsCel] = useState(() => list[0].main.flag_isCelsius)

  const date = dayjs.unix(list[0].dt).format('ddd, D MMM, HH:mm')
  // console.log(dayjs.unix(list[0].dt).format('ddd, D MMM, HH:mm'), '1qqqqq')

  const iconS = list[0].weather[0].icon
  const link = `http://openweathermap.org/img/wn/${iconS}@2x.png`

  const graphData: any[] = [{ id: uuidv4(), color: 'hsl(23, 70%, 50%)', data: [] }]

  const result: [] = list.map((el: any) => {
    const dt = dayjs.unix(el.dt).format('DD.MM')
    // const dt = dayjs.unix(el.dt).format('YYYY-MM-DD')
    return { x: dt, y: el.main.flag_isCelsius ? el.main.tempC : el.main.tempF }
  })
  // @ts-ignore
  const arreyY = result.map(res => res.y)
  const maxY = Math.max(...arreyY)
  const minY = Math.min(...arreyY)

  graphData[0].data = result

  const onBtnC = () => {
    // @ts-ignore
    citys.editCity({ isCel: true, id: city.id })
    setIsCel(true)
  }

  const onBtnF = () => {
    // @ts-ignore
    citys.editCity({ isCel: false, id: city.id })
    setIsCel(false)
  }

  return (
    <div
      className={cn(styles.card, {
        [styles.worm]: list[0].main.tempC > 0,
        [styles.cold]: list[0].main.tempC <= 0,
      })}
    >
      <div className={styles.topInfo}>
        <div className={styles.location}>
          {/* @ts-ignore */}
          {city.name}, {city.country}
        </div>
      </div>
      <div className={styles.weather}>
        <img src={link} alt="icon" />
        {list[0].weather[0].main}
      </div>
      <p className={styles.date}>{date}</p>
      <div className={styles.graph}>
        {/* @ts-ignore */}
        <MyResponsiveLine
          data={graphData}
          maxY={maxY}
          minY={minY}
          colorA={list[0].main.tempC > 0 ? '#FFA25B' : '#5B8CFF'}
          colorB={list[0].main.tempC > 0 ? '#FFF4F4' : '#FFF4F4'}
        />
      </div>
      <div className={styles.bottomInfo}>
        <div>
          <div className={styles.bottomInfoTemperature}>
            <span className={styles.degrees}>
              {isCel ? `${list[0].main.tempC}` : `${list[0].main.tempF}`}
            </span>
            <div className={styles.units}>
              <button className={cn(styles.celsius, { [styles.active]: isCel })} onClick={onBtnC}>
                °C
              </button>
              <button
                className={cn(styles.fahrenheit, { [styles.active]: !isCel })}
                onClick={onBtnF}
              >
                °F
              </button>
            </div>
          </div>
          <p className={styles.feels}>
            Feels like:
            <span>{isCel ? `${list[0].main.feelsC} °C` : `${list[0].main.feelsF} °F`}</span>
          </p>
        </div>
        <ul className={styles.bottomInfoPrecipitation}>
          <li>
            Wind:{' '}
            <span
              className={cn(styles.worm, {
                [styles.cold]: list[0].main.tempC <= 0,
              })}
            >
              {list[0].wind.speed} m/s
            </span>
          </li>
          <li>
            Humidity:{' '}
            <span
              className={cn(styles.worm, {
                [styles.cold]: list[0].main.tempC <= 0,
              })}
            >
              {list[0].main.humidity} %
            </span>
          </li>
          <li>
            Pressure:{' '}
            <span
              className={cn(styles.worm, {
                [styles.cold]: list[0].main.tempC <= 0,
              })}
            >
              {list[0].main.pressure} Pa
            </span>
          </li>
        </ul>
      </div>
      {/* @ts-ignore */}
      <Cross trigger={() => citys.delCity(city.id)} className={styles.iconCross} />
    </div>
  )
}
