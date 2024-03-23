import axiosHolder from './axios'

export const getProducts = async () =>{
  const res = await axiosHolder.get(`/products?limit=15&skip=${Math.floor(Math.random() *75) +1}`);

  res.data.products.forEach(item=>{
    item.oldPrice = item.price + parseFloat(((item.price / 100) * Math.round(item.discountPercentage)).toFixed(2))
  })

  return res.data.products;
}

export const getRoute = (index,breadCrumbArr,startWith='/category')=>{
  let _route = startWith;
  for(let i=0;i<=index;i++){
    _route += '/'+ breadCrumbArr[i]
  }
  return _route
}

export const kebabToCapitalize = (item)=>{
  let splittedStr = item.split('-');
  for(let i=0;i<splittedStr.length;i++){
    let str = splittedStr[i];
    splittedStr[i] = str.substring(0, 1).toUpperCase() + str.substring(1);
  }
  return splittedStr.join(' ');
}
