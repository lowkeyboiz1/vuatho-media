import { TPost } from '@/types'
import { atom } from 'jotai'

export const isOpenModalFlexAtom = atom<boolean>(false)
export const isOpenModalSearchAtom = atom<boolean>(false)
export const isOpenModalCompleteAtom = atom<boolean>(false)
export const isOpenModalDetailAtom = atom<boolean>(false)
export const isOpenModalConfirmAtom = atom<boolean>(false)

export const postSelectedAtom = atom<TPost | null>(null)
