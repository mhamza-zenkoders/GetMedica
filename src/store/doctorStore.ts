import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import MMKVStorage from '../utils/MMKVStorage';

interface DoctorStore {
  DoctorsList: any | null; 
  setDoctorsList: (DoctorsList: any) => void;
  clearDoctorsList: () => void;
}

export const useDoctorStore = create(
  persist<DoctorStore>(
    (set) => ({
    DoctorsList: null,
      setDoctorsList: (DoctorsList) => set({DoctorsList}),
      clearDoctorsList: () => set({DoctorsList: null}),
    }),
    {
      name: 'doctor-storage',
      storage: createJSONStorage(()=>MMKVStorage),
    }
  )
);

