export const _menuItems=[
  {title:'Github',value:'github',address:'https://github.com/erdmcaglak/',icon:'mdi:github'},
  {title:'Instagram',value:'instagram',address:'https://instagram.com/erdemcaglak/',icon:'mdi:instagram'},
  {title:'Linkedin',value:'linkedin',address:'https://www.linkedin.com/in/erdemcaglak/',icon:'mdi:linkedin'},
  {title:'Spotify',value:'spotify',address:'https://open.spotify.com/user/11148043928?si=0bd8787afb5244a9',icon:'mdi:spotify'},
  {title:'Twitter',value:'twitter',address:'https://twitter.com/_caglakErdem',icon:'mdi:twitter'},
]

export const menuItems=[
  {title:'Electronics',value:'electronics',route:'/electronics',children:[
    {title:'Smart Phones',value:'smartphones',route:'/electronics/smartphones'},
    {title:'Laptops',value:'laptops',route:'/electronics/laptops'},
  ]},
  {title:'Personal Care',value:'personal-care',route:'/personal-care',children:[
    {title:'Fragrances',value:'fragrances',route:'/furniture-home/fragrances'},
    {title:'Skin Care',value:'skincare',route:'/furniture-home/skincare'},
  ]},
  {title:'Furniture & Home',value:'furniture-home',route:'/furniture-home',children:[
    {title:'Home Decoration',value:'home-decoration',route:'/furniture-home/home-decoration'},
    {title:'Lighting',value:'lighting',route:'/furniture-home/lighting'},
    {title:'Furtinure',value:'furniture',route:'/furniture-home/furniture'},
  ]},
  {title:'Clothes',value:'clothes',route:'/clothes',children:[
    {title:'Women',value:'women',route:'/clothes/women',children:[
      {title:'Dresses',value:'womens-dresses',route:'/clothes/women/dresses'},
      {title:'Shoes',value:'womens-shoes',route:'/clothes/women/shoes'},
      {title:'Watches',value:'womens-watches',route:'/clothes/women/watches'},
      {title:'Bags',value:'womens-bags',route:'/clothes/women/bags'},
      {title:'Jewellery',value:'womens-jewellery',route:'/clothes/women/jewellery'},
      {title:'Sunglasses',value:'sunglasses',route:'/clothes/women/sunglasses'},
    ]},
    {title:'Men',value:'men',route:'/clothes/men',children:[
      {title:'Shirts',value:'mens-shirts',route:'/clothes/men/shirts'},
      {title:'Shoes',value:'mens-shoes',route:'/clothes/men/shoes'},
      {title:'Watches',value:'mens-watches',route:'/clothes/men/watches'},
      {title:'Sunglasses',value:'sunglasses',route:'/clothes/men/sunglasses'},
    ]},
  ]},
  {title:'Sale',value:'sale',route:'/sale',children:[
    {title:'Tops',value:'tops',route:'/sale/tops'},
    {title:'Groceries',value:'groceries',route:'/sale/groceries'},
    {title:'Automotive',value:'automotive',route:'/sale/automotive'},
    {title:'Motorcycle',value:'motorcycle',route:'/sale/motorcycle'},
  ]},
]