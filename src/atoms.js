import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const calorieState=atom({
    key:'calorieState',
    default:0,
    effects_UNSTABLE: [persistAtom],
});

export const mealState=atom({
  key:'mealState',
  default:[],
  effects_UNSTABLE: [persistAtom],
});

export const workoutState=atom({
  key:'workoutState',
  default:[],
  effects_UNSTABLE: [persistAtom],
});

export const calorieG=atom({
  key:'calorieG',
  default:0,
  effects_UNSTABLE: [persistAtom],
});

export const calorieL=atom({
  key:'calorieL',
  default:0,
  effects_UNSTABLE: [persistAtom],
});

export const liftingState=atom({
  key:'liftingState',
  default:[],
  effects_UNSTABLE: [persistAtom],
});

export const selectedDat=atom({
  key: 'selectedDat',
  default: (new Date())
})

export const CalForDay = atom ({
  key: 'CalForDay',
  default: [],
})

export const bmr=atom({
  key:'bmr',
  default:'0',
});

export const bmrD=atom({
  key:'bmrD',
  default:0,
});

export const Time=atom({
  key:'Time',
  default:'',
  effects_UNSTABLE: [persistAtom],
});


export const bmrF=atom({
  key:'bmrF',
  default:0,
});

export const helpMe=atom({
  key:'helpMe',
  default:0,
  effects_UNSTABLE: [persistAtom],
});







