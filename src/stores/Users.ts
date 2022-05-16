import { api } from 'config'
import { observable, action, runInAction, makeAutoObservable } from 'mobx'

import { IComments } from 'types/User'
import { RootStore } from 'stores'

export class UserStore {
  rootStore: RootStore

  @observable comments: IComments[] | null = null

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }
  @action
  async getData(): Promise<any> {
    try {
      const { data } = await api.get('comments')
      runInAction(() => (this.comments = data.slice(1, 20)))
      return data
    } catch (error) {
      console.log(error, 'Failed to get data')
    }
  }
}
