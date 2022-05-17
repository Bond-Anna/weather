import { makeAutoObservable } from 'mobx'
import { api } from 'config'
import { ListEntity, CityData } from 'types/City'

type Data = {
  isCel: boolean
  id: number
}

class Citys {
  citysData: CityData[] = []
  isHe: boolean = false
  langLabel: string = ''

  constructor() {
    makeAutoObservable(this)
  }
  date: string = new Date().toISOString().slice(0, 10)

  async myGeo({ latitude, longitude }: { latitude: number; longitude: number }): Promise<any> {
    try {
      const res = await api.get(
        `?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )

      const hourDateArrey: ListEntity[] | null = []

      res.data.list.forEach((el: ListEntity) => {
        if (!hourDateArrey.find(it => it?.dt_txt.slice(0, 10) === el.dt_txt.slice(0, 10))) {
          el.main.tempC = Math.round(el.main.temp - 273.15)
          el.main.tempF = Math.round(1.8 * (el.main.temp - 273.15) + 32)
          el.main.flag_isCelsius = true
          hourDateArrey.push(el)
        }
      })

      const main = res.data.list[0].main
      main.feelsC = Math.round(main.feels_like - 273.15)
      main.feelsF = Math.round(1.8 * (main.feels_like - 273.15) + 32)
      localStorage.setItem('geo', JSON.stringify(true))
      localStorage.setItem(
        'city-data',
        JSON.stringify([{ city: res.data.city, list: hourDateArrey }])
      )
      this.citysData = [{ city: res.data.city, list: hourDateArrey }, ...this.citysData]
    } catch (error) {
      console.log(error)
    }
  }
  async getCityWeather(name: string): Promise<any> {
    try {
      const res = await api.get(`?q=${name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)

      const hourDateArrey: ListEntity[] | null = []

      res.data.list.forEach((el: ListEntity) => {
        if (!hourDateArrey.find(it => it?.dt_txt.slice(0, 10) === el.dt_txt.slice(0, 10))) {
          el.main.tempC = Math.round(el.main.temp - 273.15)
          el.main.tempF = Math.round(1.8 * (el.main.temp - 273.15) + 32)
          el.main.flag_isCelsius = true
          hourDateArrey.push(el)
        }
      })

      const main = res.data.list[0].main

      main.feelsC = Math.round(main.feels_like - 273.15)
      main.feelsF = Math.round(1.8 * (main.feels_like - 273.15) + 32)

      this.citysData = [...this.citysData, { city: res.data.city, list: hourDateArrey }]

      localStorage.setItem('city-data', JSON.stringify(this.citysData))
    } catch (error) {
      console.log(error)
    }
  }
  setCity(data: CityData[]) {
    this.citysData = data
  }
  editCity(data: Data) {
    const pickedCity = this.citysData.find(it => it.city.id === data.id)
    pickedCity?.list?.map(el => (el.main.flag_isCelsius = data.isCel))
    localStorage.setItem('city-data', JSON.stringify(this.citysData))
  }

  delCity(id: number) {
    this.citysData = this.citysData.filter(it => it.city.id !== id)
    localStorage.setItem('city-data', JSON.stringify(this.citysData))
  }

  setLanguage(lang: boolean) {
    this.isHe = lang
    localStorage.setItem('is-he', JSON.stringify(this.isHe))
  }
  setLabel(label: string) {
    this.langLabel = label
    localStorage.setItem('lang-label', JSON.stringify(this.langLabel))
  }
}
export default new Citys()
