import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuard } from './auth.guard';
import { BreadcrumbComponent } from '@coreui/angular';
import { BreadcrumbsComponent } from './views/base/breadcrumbs/breadcrumbs.component';
import { NavsComponent } from './views/base/navs/navs.component';

const routes: Routes = [


  {path:'',component:LoginComponent},
  
  // 

  {
   path: 'main',
   
    canActivate:[AuthGuard],
   
    loadChildren:()=>import('./views/dashboard/dashboard.module').then((m)=>m.DashboardModule)
    },


  
  // { path: '', component: LoginComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },

  // {
  //   path: '', component: DefaultLayoutComponent,
  //   canActivate:[AuthGuard],
  //   data: { title: 'Home' },
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadChildren: () =>
  //         import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
  //     },
      {
        path: 'home',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'home1',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'teams',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons', 
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    
  

  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  { path: 'logout', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


