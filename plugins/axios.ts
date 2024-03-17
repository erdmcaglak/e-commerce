import wrapper from '@/utils/axios'

export default defineNuxtPlugin(async ()=>{
  return{
    provide:{
      axios:wrapper
    }
  }
})