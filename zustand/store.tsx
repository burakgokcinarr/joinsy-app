import { create } from 'zustand'

type Location = {
  latitude: number
  longitude: number
}

type LocationState = {
  location: Location | null
  setLocation: (newLocation: Location) => void
  clearLocation: () => void
}

const useStore = create<LocationState>((set) => ({
  location: null, // başlangıçta konum yok
  setLocation: (newLocation) => set({ location: newLocation }),
  clearLocation: () => set({ location: null }),
}))

export default useStore
