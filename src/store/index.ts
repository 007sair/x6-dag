import { atom } from 'jotai'
import { Graph } from '@antv/x6'
import { Dnd } from '@antv/x6-plugin-dnd'

export const graphAtom = atom<Graph | null>(null)
export const dndAtom = atom<Dnd | null>(null)
