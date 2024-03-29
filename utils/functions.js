export const getBrandFilterItems = (items,key) =>{
  const resArr = [];
  for(let item of items){
    let includedItem = resArr.find(e=>e.title === item[key]);
    if(includedItem) {
      includedItem.count++;
      continue;
    }
    resArr.push({
      title:item[key],
      value:item[key],
      count:1,
      checkBoxHolder:false,
    })
  }
  resArr.sort((a,b)=>b.count - a.count)
  return resArr;
}

export const getPriceFilterItems = (items,div) =>{
  const prices = items.map(e=>e.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const priceRange = parseFloat(parseFloat((max-min)/div).toFixed(2));
  const resArr = [];

  for(let i=1;i<=div;i++){
    let minArea = parseFloat((Math.round((priceRange * (i-1) + min)*100)/100).toFixed(2));
    let maxArea = parseFloat((Math.round((priceRange * i + min)*100)/100).toFixed(2));
    resArr.push({
      min:minArea,
      max:maxArea,
      title: `$${minArea} - $${maxArea}`,
      count:items.filter(e=>e.price>minArea && e.price <=maxArea)?.length,
      checkBoxHolder:false,
    })
  }

  resArr.unshift({
    min:0,
    max:parseFloat((Math.round((min)*100)/100).toFixed(2)),
    title: `< $${min}`,
    count:items.filter(e=>e.price>0 && e.price <=min)?.length,
    checkBoxHolder:false,
  })

  return resArr;
}