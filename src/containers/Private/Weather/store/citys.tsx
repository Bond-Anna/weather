import { makeAutoObservable } from 'mobx'
import { api } from 'config'

class Citys {
  citysData: Object[] = []

  constructor() {
    makeAutoObservable(this)
  }
  date: string = new Date().toISOString().slice(0, 10)

  async myGeo({ latitude, longitude }: { latitude: number; longitude: number }) {
    try {
      const res = await api.get(
        `?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )

      const hourDateArrey: any = []

      res.data.list.forEach((el: any) => {
        // @ts-ignore
        if (!hourDateArrey.find(it => it?.dt_txt.slice(0, 10) === el.dt_txt.slice(0, 10))) {
          el.main.tempC = Math.round(el.main.temp - 273.15)
          el.main.tempF = Math.round(1.8 * (el.main.temp - 273.15) + 32)
          el.main.flag_isCelsius = true
          hourDateArrey.push(el)
          // console.log(hourDateArrey, 'hourDateArrey')
        }
      })
      console.log([...this.citysData, { city: res.data.city, list: hourDateArrey }], 'myGeo212')

      const main = res.data.list[0].main
      main.feelsC = Math.round(main.feels_like - 273.15)
      main.feelsF = Math.round(1.8 * (main.feels_like - 273.15) + 32)
      // @ts-ignore
      localStorage.setItem('geo', true)
      localStorage.setItem(
        'city-data',
        JSON.stringify([{ city: res.data.city, list: hourDateArrey }])
      )
      this.citysData = [{ city: res.data.city, list: hourDateArrey }, ...this.citysData]
    } catch (error) {
      console.log(error)
    }
  }
  async getCityWeather(name: string) {
    try {
      const res = await api.get(`?q=${name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      console.log(res.data)

      const hourDateArrey: any = []

      res.data.list.forEach((el: any) => {
        // @ts-ignore
        if (!hourDateArrey.find(it => it?.dt_txt.slice(0, 10) === el.dt_txt.slice(0, 10))) {
          el.main.tempC = Math.round(el.main.temp - 273.15)
          el.main.tempF = Math.round(1.8 * (el.main.temp - 273.15) + 32)
          el.main.flag_isCelsius = true
          hourDateArrey.push(el)
        }
      })

      console.log([...this.citysData, { city: res.data.city, list: hourDateArrey }], '12121212')

      const main = res.data.list[0].main

      main.feelsC = Math.round(main.feels_like - 273.15)
      main.feelsF = Math.round(1.8 * (main.feels_like - 273.15) + 32)

      this.citysData = [...this.citysData, { city: res.data.city, list: hourDateArrey }]
      localStorage.setItem('city-data', JSON.stringify(this.citysData))
    } catch (error) {
      console.log(error)
    }
  }
  setCity(data: any) {
    this.citysData = data
  }
  // @ts-ignore
  editCity(data) {
    // @ts-ignore
    const pickedCity = this.citysData.find(it => it.city.id === data.id)
    // @ts-ignore
    pickedCity.list.map(el => (el.main.flag_isCelsius = data.isCel))
    localStorage.setItem('city-data', JSON.stringify(this.citysData))
  }

  delCity(id: number) {
    // @ts-ignore
    this.citysData = this.citysData.filter(it => it.city.id !== id)
    localStorage.setItem('city-data', JSON.stringify(this.citysData))
  }
}
export default new Citys()
