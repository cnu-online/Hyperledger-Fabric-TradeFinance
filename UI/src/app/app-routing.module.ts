import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarmainComponent } from './carmain/carmain.component';

const routes: Routes = [
  {path:'',component:CarmainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
