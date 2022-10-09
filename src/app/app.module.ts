import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from '@angular/forms';
import { ContestsComponent } from './contests/contests.component';
import { ContestComponent } from './contests/contest/contest.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, ContestsComponent, ContestComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule],
    bootstrap: [AppComponent]
})
export class AppModule {}