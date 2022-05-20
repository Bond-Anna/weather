import { makeAutoObservable, observable } from 'mobx'
import { api } from 'config'
import { ListEntity, CityData } from 'types/City'

type Data = {
  isCel: boolean
  id: number
}

export class CityStore {
  @observable citiesData: CityData[] = []
  @observable isHe: boolean = false
  @observable langLabel: string = ''

  constructor() {
    makeAutoObservable(this)
  }
  date: string = new Date().toISOString().slice(0, 10)

  async myGeo({ latitude, longitude }: { latitude: number; longitude: number }): Promise<any> {
    try {
      const res = await api.get(
        `?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )

      localStorage.setItem('myCoord', JSON.stringify({ latitude, longitude }))

      const citiesNames = localStorage.getItem('cities-names')
      if (citiesNames) {
        const parsedCitiesNames: string[] = JSON.parse(citiesNames)
        localStorage.setItem(
          'cities-names',
          JSON.stringify([res.data.city.name, ...parsedCitiesNames])
        )
      } else if (citiesNames === null) {
        localStorage.setItem('cities-names', JSON.stringify([res.data.city.name]))
      }

      const hourDateArray: ListEntity[] | null = []

      res.data.list.forEach((el: ListEntity) => {
        if (!hourDateArray.find(it => it?.dt_txt.slice(0, 10) === el.dt_txt.slice(0, 10))) {
          el.main.tempC = Math.round(el.main.temp - 273.15)
          el.main.tempF = Math.round(1.8 * (el.main.temp - 273.15) + 32)
          el.main.flag_isCelsius = true
          hourDateArray.push(el)
        }
      })

      const main = res.data.list[0].main
      main.feelsC = Math.round(main.feels_like - 273.15)
      main.feelsF = Math.round(1.8 * (main.feels_like - 273.15) + 32)

      this.citiesData = [{ city: res.data.city, list: hourDateArray }, ...this.citiesData]
    } catch (error) {
      console.log(error)
    }
  }

  async getCityWeather(name: string | string[]): Promise<any> {
    try {
      const res = await api.get(`?q=${name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)

      const citiesNames = localStorage.getItem('cities-names')
      if (citiesNames) {
        const parsedCitiesNames: string[] = JSON.parse(citiesNames)
        const filteredCitiesNames = parsedCitiesNames.filter(
          cityName => cityName !== res.data.city.name
        )
        localStorage.setItem(
          'cities-names',
          JSON.stringify([...filteredCitiesNames, res.data.city.name])
        )
      } else if (!citiesNames) {
        localStorage.setItem('cities-names', JSON.stringify([res.data.city.name]))
      }

      const hourDateArray: ListEntity[] | null = []

      res.data.list.forEach((el: ListEntity) => {
        if (!hourDateArray.find(it => it?.dt_txt.slice(0, 10) === el.dt_txt.slice(0, 10))) {
          el.main.tempC = Math.round(el.main.temp - 273.15)
          el.main.tempF = Math.round(1.8 * (el.main.temp - 273.15) + 32)
          el.main.flag_isCelsius = true
          hourDateArray.push(el)
        }
      })

      const main = res.data.list[0].main

      main.feelsC = Math.round(main.feels_like - 273.15)
      main.feelsF = Math.round(1.8 * (main.feels_like - 273.15) + 32)

      this.citiesData = [...this.citiesData, { city: res.data.city, list: hourDateArray }]
    } catch (error) {
      console.log(error)
    }
  }
  editCity(data: Data) {
    const pickedCity = this.citiesData.find(it => it.city.id === data.id)
    pickedCity?.list?.map(el => (el.main.flag_isCelsius = data.isCel))
  }

  delCity(id: number, name: string) {
    this.citiesData = this.citiesData.filter(it => it.city.id !== id)
    const citiesNames = localStorage.getItem('cities-names')
    if (citiesNames) {
      const parsedCitiesNames: string[] = JSON.parse(citiesNames)
      const filteredCitiesNames = parsedCitiesNames.filter(cityName => cityName !== name)
      localStorage.setItem('cities-names', JSON.stringify(filteredCitiesNames))
    }
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
