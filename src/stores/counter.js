import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const userInfo = defineStore('info', {
  state:()=>{
    return{
      actorId:null,
      age:null,
      department:null,
      gender:null,
      hospital:null,
      introduction:null,
      role:0,
      score:null,
      seviceYear:null,
      field:null,
      userAvatar:null,
      userName:null,
    }
  },
  actions:{
    changeLoginState(loginInfo){
      console.log(loginInfo)
      this.actorId=loginInfo.actorId;
      this.age=loginInfo.age;
      this.department=loginInfo.department;
      this.gender=loginInfo.gender;
      this.hospital=loginInfo.hospital;
      this.introduction=loginInfo.introduction;
      this.role=loginInfo.role;
      this.score=loginInfo.score;
      this.seviceYear=loginInfo.seviceYear;
      this.userAvatar=loginInfo.photo;
      this.userName=loginInfo.name;
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        // 自定义名称
        key: 'loginStore',
        // 保存位置，默认保存在sessionStorage
        storage: localStorage,
        // 指定要持久化的数据，默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
        // paths: ['age','actorId','userName','userAvatar',],
      },
    ],
  },
  
})
