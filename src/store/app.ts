import { Artist } from '@/type/artist'
import { Song } from '@/type/song'
import { create } from 'zustand'

type AppState = {
  isQueueOpen: boolean
  queue: Song[]
  index: number
  artist: Artist | undefined
  search: string

  actions: {
    setIsQueueOpen: (isQueueOpen: boolean) => void
    setSearch: (search: string) => void
    setQueue: (queue: Song[]) => void
    setIndex: (index: number) => void
    setArtist: (artist: Artist | undefined) => void
  }
}

export const useAppStore = create<AppState>((set) => ({
  isQueueOpen: false,
  queue: [],
  index: 0,
  artist: undefined,
  search: "",

  actions: {
    setIsQueueOpen: (isQueueOpen) => {
      set({ isQueueOpen })
    },
    setQueue: (queue) => {
      set({ queue })
    },
    setIndex: (index: number) => {
      set({ index })
    },
    setArtist: (artist: Artist | undefined) => {
      set({ artist })
    },
    setSearch: (search: string) => {
      set({ search })
    }
  },
}))

export const useAppAction = () => useAppStore((state) => state.actions)
