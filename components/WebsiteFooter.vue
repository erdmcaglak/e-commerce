<script>
export default {
  data(){
    return{
      footerItems:[
        {main:'Product',items:[
          'Pricing',
          'Overview',
          'Browse',
          'Accessibility',
          'Five'
        ]},
        {main:'Solutions',items:[
          'Brainstorming',
          'Ideation',
          'Wireframing',
          'Research',
          'Design'
        ]},
        {main:'Support',items:[
          'Contact Us',
          'Developers',
          'Documentation',
          'Integrations',
          'Reports'
        ]},
      ],
      socialMedias:[
        {title:'Youtube',icon:'youtube.svg',link:'https://www.youtube.com/@BaykarTechnologies'},
        {title:'Facebook',icon:'facebook.svg',link:'https://www.facebook.com/BaykarTech/'},
        {title:'Twitter',icon:'twitter.svg',link:'https://twitter.com/BaykarTech'},
        {title:'Instagram',icon:'instagram.svg',link:'https://www.instagram.com/baykartech/'},
        {title:'Linkedin',icon:'linkedin.svg',link:'https://www.linkedin.com/company/baykar/'},
      ],
      footerMenuItems:[
        {title:'Terms'},
        {title:'Privacy'},
        {title:'Contact'},
        {title:'En',icon:'world.svg'},
      ]
    }
  }
}
</script>

<template>
  <div class="footer-main">
    <div class="footer container-main">
      <div class="button-area">
        <div v-for="(item,i) in footerItems" :key="'buttonsGroup'+i" class="buttons-wrapper">
          <div class="main">
            {{item.main}}
          </div>
          <div v-for="(lowItem,k) in item.items" :key="'lowItem'+k" class="items">
            {{lowItem}}
          </div>
        </div>
        <div class="get-app">
          <div class="app-buttons">
            <div class="main">
              Get the App
            </div>
            <div class="store">
              <img class="select-none pointer-events-none" src="@/assets/images/app_store.svg" alt="">
            </div>
            <div class="store">
              <img class="select-none pointer-events-none" src="@/assets/images/google_play.svg" alt="">
            </div>
          </div>
          <div class="social-media">
            <div class="main">
              Follow Us
            </div>
          </div>
        </div>
      </div>
      <div class="terms">
        <div class="copyright">
          Collers @ 2023. All rights reserved.
        </div>
        <div class="footer-menus-wrapper">
          <div v-for="(item,i) in footerMenuItems" :key="'fotterMenu'+i" class="footer-menu-items">
            <div class="menu-text">
              {{item.title}}
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .footer-main{
    width: 100%;
    background-color: #0F172A;
    padding-bottom:30px;
    .footer{
      margin: 0 auto;
      padding: 0 16px;
      gap: 32px;
      position: relative;
      @include d-flex(column,flex-start,flex-start);
      .button-area{
        width: 100%;
        @include d-flex(row,space-between,stretch);
        border-bottom: 1px solid #334155;
        padding: 48px 0;
        @media screen and (max-width:639px) {
          flex-direction: column;
          gap: 48px;
        }
        .main{
          font-size: 16px;
          font-weight: 700;
          color: $white1;
          text-align: left;
          padding: 12px;
          cursor: pointer;
          user-select: none;
        }
        .buttons-wrapper{
          @include d-flex(column,flex-start,stretch);
          flex: 1 0 0%;
          @media screen and (max-width:639px) {
            align-items: center;
            gap: 48px;
          }
          .items{
            font-size: 16px;
            font-weight: 500;
            color: $white7;
            text-align: left;
            padding: 12px;
            cursor: pointer;
            user-select: none;
          }
        }
        .get-app{
          @include d-flex(column,space-between,stretch);
          flex: 1 0 0%;
          @media screen and (max-width:639px) {
            align-items: center;
            gap: 56px;
          }
          .app-buttons{
            @include d-flex(column,flex-start,stretch);
            gap: 8px;
            @media screen and (max-width:639px) {
              align-items: center;
            }
            .store{
              color: $white1;
              border-radius: 8px;
              @include d-flex(row,flex-start,center);
              gap: 8px;
              cursor: pointer;
              user-select: none;
            }
          }
          .social-media{
            @include d-flex(column,flex-start,stretch);
            @media screen and (max-width:639px) {
              align-items: center;
            }
          }
        }
      }
      .terms{
        @include d-flex(row,space-between,center);
        width: 100%;
        @media screen and (max-width:639px) {
          flex-direction: column;
          gap: 24px;
        }
        .copyright{
          color: $white7;
          font-size: 16px;
          font-weight: 500;
        }
        .footer-menus-wrapper{
          @include d-flex(row,flex-start,center);
          gap: 32px;
          .footer-menu-items{
            @include d-flex-center;
            gap: 8px;
            .menu-text{
              font-size: 16px;
              color: $white7;
              font-weight: 500;
              user-select: none;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>