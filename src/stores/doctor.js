import { defineStore } from 'pinia'

export const doctorStore = defineStore('countera', {
  state: () => {
    return {
      hospital:"上海市同济医院",
      service_year:20,
      department:"耳鼻喉科",
      field:"专治耳鸣、鼻炎等疑难杂症",
      score:"5.0"
    };
  }
})
