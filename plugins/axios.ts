import axiosHolder from '@/utils/axios'

export default defineNuxtPlugin(async ()=>{
  return{
    provide:{
      axios:axiosHolder
    }
  }
})