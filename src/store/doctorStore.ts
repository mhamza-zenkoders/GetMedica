import {create} from 'zustand';

export interface Doctor {
  id: string;
  email: string;
  name: string;
  role: string;
  specialization: string;
  timingID: string;
  timeSchedule: any;
}

interface DoctorsStore {
  doctors: any;
  filteredDoctors: any;
  setDoctors: (doctors: any) => void;
  setFilteredDoctors: (filteredDoctors: any) => void;
}

export const useDoctorsStore = create<DoctorsStore>(set => ({
  doctors: [],
  filteredDoctors: [],
  setDoctors: doctors => set({doctors}),
  setFilteredDoctors: filteredDoctors => set({filteredDoctors}),
}));
