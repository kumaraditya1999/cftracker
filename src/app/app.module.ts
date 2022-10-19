import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from '@angular/forms';
import { ContestsComponent } from './contests/contests.component';
import { ContestComponent } from './contests/contest/contest.component';
import { HttpClientModule } from '@angular/common/http';
import { ProblemComponent } from './contests/contest/problem/problem.component';
import { HeaderComponent } from './contests/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        AppComponent, 
        ContestsComponent, 
        ContestComponent, 
        ProblemComponent, 
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule, 
        HttpClientModule, 
        BrowserAnimationsModule, 
        MatButtonModule, 
        NgxPaginationModule, 
        MatSelectModule,
        MatGridListModule, 
        MatInputModule,
        MatIconModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}