export const socialMedias=[
  {title:'Github',icon:'mdi:github',src:'https://github.com/erdmcaglak'},
  {title:'LinkedIn',icon:'mdi:linkedin',src:'https://www.linkedin.com/in/erdemcaglak/'},
  {title:'Twitter',icon:'mdi:twitter',src:'https://twitter.com/_caglakErdem'},
  {title:'Instagram',icon:'mdi:instagram',src:'https://www.instagram.com/erdemcaglak/'},
  {title:'Youtube',icon:'mdi:youtube',src:'https://www.youtube.com/@erdemcaglak4573/featured'},
]

export const footerMenuItems=[
  {title:'Terms',src:'https://www.termsandcondiitionssample.com/'},
  {title:'Privacy',src:'https://termly.io/resources/templates/privacy-policy-template/'},
  {title:'Contact',src:'https://www.searchenginejournal.com/examples-contact-us-pages/378518/'},
]

export const menuItems=[
  {
    title:'All Categories',value:'all-categories',
    icon:'mdi:format-list-bulleted',
  },
  {title:'Electronics',value:'electronics',route:'/category/electronics',children:[
    {title:'Smart Phones',value:'smartphones',route:'/category/electronics/smartphones',options:['color']},
    {title:'Tablets',value:'tablets',route:'/category/electronics/tablets',options:['color']},
    {title:'Laptops',value:'laptops',route:'/category/electronics/laptops',options:['color']},
    {title:'Mobile Accessories',value:'mobile-accessories',route:'/category/electronics/mobile-accessories',options:['color']},
    
  ]},
  {title:'Personal Care',value:'personal-care',route:'/category/personal-care',children:[
    {title:'Fragrances',value:'fragrances',route:'/category/furniture-home/fragrances'},
    {title:'Skin Care',value:'skincare',route:'/category/furniture-home/skincare'},
    {title:'Beauty',value:'beauty',route:'/category/furniture-home/beauty'},
  ]},
  {title:'Furniture & Home',value:'furniture-home',route:'/category/furniture-home',children:[
    {title:'Home Decoration',value:'home-decoration',route:'/category/furniture-home/home-decoration'},
    {title:'Lighting',value:'lighting',route:'/category/furniture-home/lighting',options:['color']},
    {title:'Furtinure',value:'furniture',route:'/category/furniture-home/furniture',options:['color']},
    {title:'Kitchen Accessories',value:'kitchen-accessories',route:'/category/furniture-home/kitchen-accessories'},
  ]},
  {title:'Clothes',value:'clothes',route:'/category/clothes',children:[
    {title:'Women',value:'women',route:'/category/clothes/women',children:[
      {title:'Women Dresses',value:'womens-dresses',route:'/category/clothes/womens/dresses',options:['default','color']},
      {title:'Women Shoes',value:'womens-shoes',route:'/category/clothes/womens/shoes',options:['number','color']},
      {title:'Women Watches',value:'womens-watches',route:'/category/clothes/womens/watches',options:['color']},
      {title:'Women Bags',value:'womens-bags',route:'/category/clothes/womens/bags',options:['color']},
      {title:'Women Jewellery',value:'womens-jewellery',route:'/category/clothes/womens/jewellery'},
    ]},
    {title:'Men',value:'mens',route:'/category/clothes/men',children:[
      {title:'Men Shirts',value:'mens-shirts',route:'/category/clothes/mens/shirts',options:['default','color']},
      {title:'Men Shoes',value:'mens-shoes',route:'/category/clothes/mens/shoes',options:['number','color']},
      {title:'Men Watches',value:'mens-watches',route:'/category/clothes/mens/watches',options:['color']},
    ]},
  ]},
  {title:'Sale',value:'sale',route:'/category/sale',children:[
    {title:'Tops',value:'tops',route:'/category/sale/tops',options:['default','color']},
    {title:'Groceries',value:'groceries',route:'/category/sale/groceries'},
    {title:'Vehicle',value:'vehicle',route:'/category/sale/vehicle',options:['color']},
    {title:'Motorcycle',value:'motorcycle',route:'/category/sale/motorcycle',options:['color']},
    {title:'Sunglasses',value:'sunglasses',route:'/category/sale/sunglasses',options:['color']},
    {title:'Sport Accessories',value:'sport-accessories',route:'/category/electronics/sport-accessories'},
  ]},
]

export const sortByItems = [
  {title:'Popularity',value:'popularity',sortKey:'rating',type:'desc'},
  {title:'Price Low to High',value:'price-low-to-high',sortKey:'price',type:'asc'},
  {title:'Price High to Low',value:'price-high-to-low',sortKey:'price',type:'desc'},
  {title:'Name A-Z',value:'name-a-z',sortKey:'title',type:'asc'},
  {title:'Name Z-A',value:'name-z-a',sortKey:'title',type:'desc'},
]

export const colors = [
  {value:'red',title:'Red'},
  {value:'black',title:'Black'},
  {value:'blue',title:'Blue'},
  {value:'yellow',title:'Yellow'},
  {value:'pink',title:'Pink'},
]

export const defaultSizes = [
  {value:'xs',title:'XS'},
  {value:'s',title:'S'},
  {value:'m',title:'M'},
  {value:'l',title:'L'},
  {value:'xl',title:'XL'},
]

export const numberSizes = [
  { title: "36", value: "36" },
  { title: "37", value: "37" },
  { title: "38", value: "38" },
  { title: "39", value: "39" },
  { title: "40", value: "40" },
  { title: "41", value: "41" },
  { title: "42", value: "42" },
  { title: "43", value: "43" },
  { title: "44", value: "44" }
]

export const alertTypeMap = {
  'danger' : '#ec5757',
  'success' : '#4CAF50',
  'warning' : '#FB8C00',
} 