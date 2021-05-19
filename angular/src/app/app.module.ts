import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CharacterComponent } from './character/character.component';
import { CreatureComponent } from './creature/creature.component';
import { EpisodeComponent } from './episode/episode.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ExternalComponent } from './external/external.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CharacterComponent,
    CreatureComponent,
    EpisodeComponent,
    NotfoundComponent,
    ExternalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "characters",
        component: CharacterComponent
      },
      {
        path: "creatures",
        component: CreatureComponent
      },
      {
        path: "episodes",
        component: EpisodeComponent
      },
      {
        path: "external",
        component: ExternalComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "", redirectTo: "characters", pathMatch: "full"
      },
      {
        path: "**", component: NotfoundComponent
      }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
