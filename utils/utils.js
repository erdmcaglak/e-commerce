import axiosHolder from './axios'

export const getProducts = async () =>{
  const res = await axiosHolder.get(`/products?limit=15&skip=${Math.floor(Math.random() *75) +1}`);

  res.data.products.forEach(item=>{
    item.oldPrice = item.price + parseFloat(((item.price / 100) * Math.round(item.discountPercentage)).toFixed(2))
  })

  return res.data.products;
}
