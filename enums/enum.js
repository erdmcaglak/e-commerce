export const _menuItems=[
  {title:'Github',value:'github',address:'https://github.com/erdmcaglak/',icon:'mdi:github'},
  {title:'Instagram',value:'instagram',address:'https://instagram.com/erdemcaglak/',icon:'mdi:instagram'},
  {title:'Linkedin',value:'linkedin',address:'https://www.linkedin.com/in/erdemcaglak/',icon:'mdi:linkedin'},
  {title:'Spotify',value:'spotify',address:'https://open.spotify.com/user/11148043928?si=0bd8787afb5244a9',icon:'mdi:spotify'},
  {title:'Twitter',value:'twitter',address:'https://twitter.com/_caglakErdem',icon:'mdi:twitter'},
]

export const menuItems=[
  {title:'Electronics',value:'electronics',route:'/category/electronics',children:[
    {title:'Smart Phones',value:'smartphones',route:'/category/electronics/smartphones'},
    {title:'Laptops',value:'laptops',route:'/category/electronics/laptops'},
  ]},
  {title:'Personal Care',value:'personal-care',route:'/category/personal-care',children:[
    {title:'Fragrances',value:'fragrances',route:'/category/furniture-home/fragrances'},
    {title:'Skin Care',value:'skincare',route:'/category/furniture-home/skincare'},
  ]},
  {title:'Furniture & Home',value:'furniture-home',route:'/category/furniture-home',children:[
    {title:'Home Decoration',value:'home-decoration',route:'/category/furniture-home/home-decoration'},
    {title:'Lighting',value:'lighting',route:'/category/furniture-home/lighting'},
    {title:'Furtinure',value:'furniture',route:'/category/furniture-home/furniture'},
  ]},
  {title:'Clothes',value:'clothes',route:'/category/clothes',children:[
    {title:'Women',value:'women',route:'/category/clothes/women',children:[
      {title:'Dresses',value:'womens-dresses',route:'/category/clothes/women/dresses'},
      {title:'Shoes',value:'womens-shoes',route:'/category/clothes/women/shoes'},
      {title:'Watches',value:'womens-watches',route:'/category/clothes/women/watches'},
      {title:'Bags',value:'womens-bags',route:'/category/clothes/women/bags'},
      {title:'Jewellery',value:'womens-jewellery',route:'/category/clothes/women/jewellery'},
      {title:'Sunglasses',value:'sunglasses',route:'/category/clothes/women/sunglasses'},
    ]},
    {title:'Men',value:'men',route:'/category/clothes/men',children:[
      {title:'Shirts',value:'mens-shirts',route:'/category/clothes/men/shirts'},
      {title:'Shoes',value:'mens-shoes',route:'/category/clothes/men/shoes'},
      {title:'Watches',value:'mens-watches',route:'/category/clothes/men/watches'},
      {title:'Sunglasses',value:'sunglasses',route:'/category/clothes/men/sunglasses'},
    ]},
  ]},
  {title:'Sale',value:'sale',route:'/category/sale',children:[
    {title:'Tops',value:'tops',route:'/category/sale/tops'},
    {title:'Groceries',value:'groceries',route:'/category/sale/groceries'},
    {title:'Automotive',value:'automotive',route:'/category/sale/automotive'},
    {title:'Motorcycle',value:'motorcycle',route:'/category/sale/motorcycle'},
  ]},
]