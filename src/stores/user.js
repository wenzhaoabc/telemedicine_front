import { defineStore } from "pinia";

const userStore = defineStore('user', {
    state: () => {
        return {
            actor_id: 123456785,
            name: '张晟',
            avatar: 'https://s2.loli.net/2022/11/05/8j6akmQ9xViINKG.jpg',
            role: 'patient',
            telephone: '12589631472',

        }
    }
})

export default userStore