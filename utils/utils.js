import axiosHolder from './axios'
import {menuItems} from '@/enums/enum'

const _findCategory = (category,arr) =>{
  for(let item of arr){
    if(item.value === category){
      return item
    }
    if(!Object.prototype.hasOwnProperty.call(item,'children'))continue;
    else{
      let obj = _findCategory(category,item.children)
      if(obj){
        return obj
      }
    }
  }
  return undefined;
}

const _getAccessableCategories = (category) =>{
  const resArr = [];
  const recursiveFunc = (obj) =>{
    if(obj && Object.prototype.hasOwnProperty.call(obj,'children')){
      for(let item of obj.children){
        if(Object.prototype.hasOwnProperty.call(item,'children')){
          recursiveFunc(item);
          continue;
        }
        resArr.push(item.value);
      }
    }
    else if (obj){
      resArr.push(obj.value)
    }
  }
  recursiveFunc(_findCategory(category,menuItems));
  return resArr;
}

const _setProductsLength = (arr) =>{
  const multipleArr = (tempArr) =>{
    tempArr.push(...JSON.parse(JSON.stringify(tempArr)));
    if(tempArr.length < 50){
      return multipleArr(arr);
    }
    return tempArr;
  }
  if(arr.length > 0) return multipleArr(arr);

  return undefined
}

const _setOldPrice = (prods) =>{
  if(Array.isArray(prods)){
    prods?.forEach(item=>{
      item.randomImageIndex = Math.floor(Math.random()*item.images.length);
      item.oldPrice = (item.price + parseFloat(((item.price / 100) * Math.round(item.discountPercentage)).toFixed(2))).toFixed(2)
      item.price = item.price.toFixed(2)
    })
  }
  else{
    prods.randomImageIndex = Math.floor(Math.random()*prods.images.length);
    prods.oldPrice = (prods.price + parseFloat(((prods.price / 100) * Math.round(prods.discountPercentage)).toFixed(2))).toFixed(2)
    prods.price = prods.price.toFixed(2);
  }
  
  return prods
}

export const getProducts = async () =>{
  const res = await axiosHolder.get(`/products?limit=15&skip=${Math.floor(Math.random() *75) +1}`);

  return _setOldPrice(res.data.products);
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

export const getCategoryProducts = async (category)=>{
  const categories = _getAccessableCategories(category);
  const resultArr = [];

  if(categories.length === 0){
    const res = await axiosHolder.get(`/products/category/${category}`);
  
    resultArr.push(...res.data.products)
  }
  else{
    for(let _category of categories){
      const res = await axiosHolder.get(`/products/category/${_category}`);
  
      resultArr.push(...res.data.products)
    }
  }
  

  return _setOldPrice(_setProductsLength(resultArr));
}

export const getProductDetail = async (productId) =>{
  const prodDetail = await axiosHolder.get(`/products/${productId}`);

  return _setOldPrice(prodDetail?.data) || {}
}

export const getProductCategory = (childCategory)=>{

  let resStr = "";
  let isFounded = false;
  let categoryObj;
  const deepFunc = (arr) =>{
    for(let item of arr){
      resStr = ''
      if(item.children){
        resStr += '||' + item.value
        resStr += deepFunc(item.children)
      }
      else if(item.value === childCategory){
        resStr+= '||'+ item.value
        categoryObj = item;
        isFounded=true;
        return resStr;
      }
      if(isFounded) break;
    }
    return resStr
  }

  deepFunc(menuItems);
  if(resStr.startsWith('||')){
    resStr.replace('||','')
  }

  return {
    categoryArr:resStr.split('||'),
    categoryObj
  }
}

