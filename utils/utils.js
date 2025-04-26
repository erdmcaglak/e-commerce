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

const _setProductsLength = (arr,multiply=1) =>{
  const res = [];
  for(let i=0;i<multiply;i++){
    res.push(...Array.from(arr))
  }
  return res;
}

const _setOldPrice = (prods) =>{
  for(let i=0;i<prods.length;i++){
    prods[i].randomImageIndex = Math.floor(Math.random() * (prods[i].images?.length || 1));
    if(Math.round((prods[i].discountPercentage || 0)) > 0){
      prods[i].oldPrice = parseFloat((prods[i].price * (1+(Math.round(prods[i].discountPercentage)/100))).toFixed(2));
    } 
    prods[i].price = parseFloat(prods[i].price.toFixed(2))
  }
  
  return prods
}

export const getProducts = async (limit=15) =>{
  try{
    const res = await axiosHolder.get(`/products?limit=${limit}&skip=${Math.floor(Math.random() *(150-limit)) +1}`);

    return _setOldPrice(res.data.products);
  }catch(e){
    console.error(e);
    return [];
  }
  
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

export const getCategoryProducts = async (category,limit,multiply)=>{
  try{
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
    
    
    return limit ? _setOldPrice(_setProductsLength(resultArr,multiply)).slice(0,limit) : _setOldPrice(_setProductsLength(resultArr,multiply));
  }catch(e){
    console.error(e);
    return [];
  }
  
}

export const getProductDetail = async (productId) =>{
  try{
    const prodDetail = await axiosHolder.get(`/products/${productId}`);

    return _setOldPrice([prodDetail?.data])[0] || {}
  }catch(e){
    console.error(e);
    return {};
  }
  
}

export const getProductCategory = (childCategory,beauty)=>{

  let resStr = "";
  let isFounded = false;
  let categoryObj;
  const deepFunc = (arr) =>{
    for(let item of arr){
      resStr = ''
      if(item.children){
        resStr += '||' + (beauty ? item.title :item.value)
        resStr += deepFunc(item.children)
      }
      else if(item.value === childCategory){
        resStr+= '||'+ (beauty ? item.title :item.value)
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

export const priceFixer = (price)=>{
  var temp = (Math.round(price * 100) / 100).toFixed(2).toString().replace(".", ',');
  temp = temp.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,`$1.`);

  //console.log("getter: " + temp);
  return temp !== "NaN" ? `$${temp}` : "";
}

export const customHttp = async (status,response) =>{
  try{
    let resMessage='';
    if(response){
      resMessage = '/'+response
    }
    const res = await axiosHolder.get(`/http/${status}${resMessage}?delay=2000`);

    return res.data;
  }catch(e){
    console.error(e);
    return true;
  }
  
}

export const generateTaxId = (length=10) => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result.toUpperCase();
}

export const getCategories = async () =>{
  try{
    const categories = await axiosHolder.get(`/products/categories`);
    
    return categories.data;
  }catch(err){
    console.error(err);
    return [];
  }
}

export const getRandomCategories = async (count=4) =>{
  try{
    const categories = await axiosHolder.get(`/products/categories`);
    const res = [];
        
    const randomCatPicker = (arr) =>{
      if(res.length === count) return;

      let rand = Math.round(Math.random() * (arr.length-1));
      
      if(!res.includes(arr[rand])){
        res.push(arr[rand]);
        arr.splice(rand,1);
      }
      
      randomCatPicker(arr);
    }
    
    randomCatPicker(categories.data.map(e=>e.slug));
    
    return res;
  }catch(err){
    console.error(err);
    return [];
  }
}

export const searchProd = async (sQuery)=>{
  try{
    const res = await axiosHolder.get(`/products/search?q=${sQuery}`);

    return res.data.products;
  }catch(err){
    console.error(err);
    return [];
  }
  
  
}