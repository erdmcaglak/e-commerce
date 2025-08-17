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

export const isMobileDevice = ()=>{
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}