import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout.routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponet } from 'footer/footer.component';
import { LayoutComponent } from './layout.component';
import { LoadingModule } from '../core/loading/loading-module';

@NgModule({
  declarations:[
    SidebarComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponet
  ],
  exports:[
    SidebarComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponet
  ],
  imports:[
    LayoutRoutingModule,
    LoadingModule,
    CommonModule,
    FormsModule
  ],
  bootstrap: [
    LayoutComponent
  ]
})
export class LayoutModule{}
