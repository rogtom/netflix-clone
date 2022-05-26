import { atom } from 'recoil'
import { Movie } from '../utils/types'

export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const movieState = atom<Movie | null>({
  key: 'movieState',
  default: null,
})
