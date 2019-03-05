import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatDialogModule, MatGridListModule, MatMenuModule } from '@angular/material';
import { CarlistComponent } from './carlist/carlist.component';
import { CardetailComponent } from './cardetail/cardetail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarmainComponent } from './carmain/carmain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FabcarService } from './fabcar.service';
import { HttpClientModule } from '@angular/common/http';
import { CarstableComponent } from './carstable/carstable.component';
import { CarHistoryDialogComponent } from './car-history-dialog/car-history-dialog.component';
import { ChaindashboardComponent } from './chaindashboard/chaindashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CarlistComponent,
    CardetailComponent,
    CarmainComponent,
    CarstableComponent,
    CarHistoryDialogComponent,
    ChaindashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,MatDialogModule,
    MatInputModule,    FlexLayoutModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,HttpClientModule, MatGridListModule, MatMenuModule
  ],
  entryComponents: [
    CarHistoryDialogComponent
  ],
  providers: [FabcarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
