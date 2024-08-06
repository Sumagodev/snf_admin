import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   iconComponent: { name: 'cil-speedometer' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // }, 
  {
    title: true,
    // name: 'Theme'
    name: 'Admin Panel'

  },
  {
    // name: 'Colors',
    name: 'Slider',
    url: '/home/slider',
    iconComponent: { name: 'cil-drop' }
  },
  {
    // name: 'Typography',
    name: 'Our Supporter',
    url: '/home/our_supporter',
    // linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-star' }
  },
  {
    // name: 'Accordion',
    name: 'Testimonial',
    url: '/home/accordion',
    iconComponent: { name: 'cil-star' }
  },
  {
    // name: 'Button groups',
    name: 'Home Articles',
    url: '/home/home_article',
    iconComponent: { name: 'cil-star' }
  },
  {
    // name: 'Button groups',
    name: 'Report',
    url: '/home/report',
    iconComponent: { name: 'cil-star' }
  },
  {
    // name: 'Base',
    
    name: 'Projects',
    url: '/home1',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      // {
      //   // name: 'Accordion',
      //   name: 'Testimonial',
      //   url: '/base/accordion'
      // },
      // {
      //   // name: 'Breadcrumbs',
      //   name: '2-Cards',
      //   url: '/base/breadcrumbs'
      // },
      // {
      //   // name: 'Cards',
      //   name: 'Imp Project Carrired By SNF',
      //   url: '/base/cards'
      // },
      // {
      //   // name: 'Carousel',
      //   name: 'Clean Water Projects',
      //   url: '/base/carousel'
      // },
      // {
      //   // name: 'Collapse',
      //   name: 'Shahid Jawan Fund',
      //   url: '/base/collapse'
      // },
      // {
      //   // name: 'List Group',
      //   name: 'Educational Facilities',
      //   url: '/base/list-group'
      // },
      // {
      //   // name: 'Navs & Tabs',
      //   name: 'Health & Medical Projects',
      //   url: '/base/navs'
      // },
      // {
      //   //   name: 'Pagination',
      //   name: 'Environmental Conservation',
      //   url: '/base/pagination'
      // },
      // {
      //   // name: 'Placeholder',
      //   name: 'Sport Projects',
      //   url: '/base/placeholder'
      // },
    
      {
        //name;'projectcategory'
        name:'Add project Category',
        url:'/home1/category'
      },
      {
        //   name: 'Popovers',
        name: 'Add Project',
        url: '/home1/project'
      },
     
      {
        //   name: 'Popovers',
        name: 'Add Project Detail',
        url: '/home1/project_detail'
      },
    ]
  },
  {
    // name: 'Buttons',
    name: 'Media/Awards',
    url: '/teams',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        // name: 'Buttons',
        name: 'Articles',
        url: '/teams/articles'
      },
      
      {
        // name: 'Dropdowns',
        name: 'Awards Recognition',
        url: '/teams/recognition'
      },
      {
        name:'News And Articles',
        url:'/forms/news-articles'
      },
    ]
  },
   {
    name: 'About Us',
     url: '/forms',
     iconComponent: { name: 'cil-notes' },
     children: [
    //    {
    //      name: 'Form Control',
    //    url: '/forms/form-control'
    //   },
    //   {
    //      name: 'Select',
    //     url: '/forms/select'
    //   },
    //   {
    //     name: 'Checks & Radios',
    //     url: '/forms/checks-radios'
    //   },
    //    {
    //      name: 'Range',
    //    url: '/forms/range'
    //  },
    //  {
    //     name: 'Input Group',
    //      url: '/forms/input-group'
    //    },
    //  {
    //     name: 'Floating Labels',
    //     url: '/forms/floating-labels'
    //    },
    //    {
    //     name: 'Layout',
    //     url: '/forms/layout'
    //   },
    //   {
    //     name: 'Validation',
    //     url: '/forms/validation'
    //   },
      
     { 
     name:'Mentors',
     url:'/forms/mentors'
     },
     { 
      name:'Founder',
      url:'/forms/founder-team'
      },
      {
        name:'Nri Participants',
        url:'/forms/nri-participants'
      },
      {
        name:'State Participants',
        url:'/forms/state'
      },
      {
        name:'Supporters & Well Wishers',
        url:'/forms/supporters'
      }

    ]
   },
  {
    // name: 'Charts',
    name: 'Contact Us',
    url: '/charts',
    iconComponent: { name: 'cil-bell' }
  },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/icons/flags'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/icons/brands'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'py-0'
  // },
  // {
  //   name: 'Live Project',
  //   url: 'https://www.socialforumindia.com/cmplpro.php',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank', class: '-text-dark' },
  //   class: 'mt-auto'
  // },
  // {
  //   name: 'SNF Website',
  //   url: 'https://www.socialforumindia.com/',
  //   iconComponent: { name: 'cil-layers' },
  //   attributes: { target: '_blank' }
  // },
  //LogOut
  {
    name: 'Logout',
    url: '/logout', // Navigate to the logout route
    iconComponent: { name: 'cil-account-logout' }
}
  
];
