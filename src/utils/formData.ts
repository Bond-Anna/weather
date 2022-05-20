import { InputData } from 'types/Form'

export const general: InputData[] = [
  { id: 'firstName', type: 'text', title: 'First Name' },
  { id: 'lastName', type: 'text', title: 'Last Name' },
  { id: 'email', type: 'email', title: 'Email Address' },
  { id: 'password', type: 'password', title: 'Password' },
  { id: 'repeatPassword', type: 'password', title: 'Repeat Password' },
]
export const address: InputData[] = [
  {
    id: 'country',
    type: 'sel',
    title: 'Country',
    options: [
      'Ukraine',
      'Georgia',
      'Germany',
      'Turkey',
      'France',
      'China',
      'USA',
      'Canada',
      'Mexico',
    ],
  },
  { id: 'address', type: 'text', title: 'Address' },
  { id: 'address2', type: 'text', title: 'Address2' },
  { id: 'city', type: 'text', title: 'City' },
  {
    id: 'state',
    type: 'sel',
    title: 'State',
    options: [
      'Kiev',
      'Tbilisi',
      'Berlin',
      'Izmir',
      'Paris',
      'Shanghai',
      'New-York',
      'Toronto',
      'Guadalajara',
    ],
  },
  { id: 'code', type: 'text', title: 'Zip Code' },
]
export const work: InputData[] = [
  { id: 'jobTitle', type: 'text', title: 'Job Title' },
  { id: 'company', type: 'text', title: 'Company / Organization' },
  { id: 'website', type: 'url', title: 'Website' },
]
