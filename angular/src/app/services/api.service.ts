import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  deploy_url: string = 'http://localhost:58932/api/v1/';
  // deploy_url: string = 'https://cloudapi-avatar.appspot.com/api/v1/';
  external_url: string = 'https://v2.jokeapi.dev/joke/';

  constructor(private http: HttpClient, private loginSvc: LoginService) {}

  // Read
  getAll(all: boolean, category: string) {
    if (all) {
      return this.http
        .get<any>(this.deploy_url + category + '?length=99')
        .toPromise()
        .catch((err: HttpErrorResponse) => {
          if (err.status == 0) {
            Swal.fire(
              'No connection',
              'There is no connection with the backend. The API seems to be down... Try again later.',
              'error'
            );
          } else {
            Swal.fire('Error', 'An error occured', 'error');
          }
        });
    }
    if (category == 'characters') {
      return this.http
        .get<any[]>(this.deploy_url + 'characters/dto')
        .toPromise();
    }
    return this.http.get<any[]>(this.deploy_url + category).toPromise();
  }

  getById(id: number, category: string) {
    return this.http
      .get<any>(this.deploy_url + category + '/' + id)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        if (err.status == 404) {
          Swal.fire('Not found', err.error, 'error');
        } else if (err.status == 0) {
          Swal.fire(
            'No connection',
            'There is no connection with the backend. The API seems to be down... Try again later.',
            'error'
          );
        } else {
          Swal.fire('Error', 'An error occured', 'error');
        }
      });
  }

  getByName(name: string, category: string) {
    return this.http
      .get<any>(this.deploy_url + category + '/?name=' + name)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        if (err.status == 404) {
          Swal.fire('Not found', err.error, 'error');
        } else if (err.status == 0) {
          Swal.fire(
            'No connection',
            'There is no connection with the backend. The API seems to be down... Try again later.',
            'error'
          );
        } else {
          Swal.fire('Error', 'An error occured', 'error');
        }
      });
  }

  getAllWithSort(page: number, sort: string, dir: string, category: string) {
    return this.http
      .get<any>(
        this.deploy_url +
          category +
          '?page=' +
          page +
          '&sort=' +
          sort +
          '&dir=' +
          dir
      )
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        if (err.status == 0) {
          Swal.fire(
            'No connection',
            'There is no connection with the backend. The API seems to be down... Try again later.',
            'error'
          );
        } else {
          Swal.fire('Error', 'An error occured', 'error');
        }
      });
  }

  getRelation(id: number, relation: string, category: string) {
    return this.http
      .get<any>(this.deploy_url + category + '/ ' + id + '/' + relation)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        if (err.status == 404) {
          Swal.fire(
            'Not found',
            "The data you are trying to look up doesn't exist.",
            'error'
          );
        } else if (err.status == 0) {
          Swal.fire(
            'No connection',
            'There is no connection with the backend. The API seems to be down... Try again later.',
            'error'
          );
        } else {
          Swal.fire('Error', 'An error occured', 'error');
        }
      });
  }

  // Create
  createObject(body: ICharacter | ICreature, category: string) {
    return this.http
      .post<any>(this.deploy_url + category + '/', body)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        if (err.status == 400) {
          Swal.fire(
            'Bad request',
            err.error.title + this.formatErrors(err.error.errors),
            'warning'
          );
        } else if (err.status == 404) {
          Swal.fire('Not found', err.error, 'error');
        } else if (err.status == 0) {
          Swal.fire(
            'No connection',
            'There is no connection with the backend. The API seems to be down... Try again later.',
            'error'
          );
        } else {
          Swal.fire('Error', 'An error occured. Try again later.', 'error');
        }
      });
  }

  // Delete
  deleteObject(id: number, category: string) {
    let httpHeader = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginSvc.jwtToken,
      }),
    };
    return this.http
      .delete<any>(this.deploy_url + category + '/' + id, httpHeader)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        if (err.status == 401) {
          Swal.fire(
            'Unauthorized',
            'You are not logged in. Please go the login page in order to access this data.',
            'error'
          );
        } else if (err.status == 400) {
          Swal.fire(
            'Bad request',
            err.error.title + this.formatErrors(err.error.errors),
            'warning'
          );
        } else if (err.status == 404) {
          Swal.fire('Not found', err.error, 'error');
        } else if (err.status == 0) {
          Swal.fire(
            'No connection',
            'There is no connection with the backend. The API seems to be down... Try again later.',
            'error'
          );
        } else {
          Swal.fire('Error', 'An error occured. Try again later.', 'error');
        }
      });
  }

  // Update
  updateObject(body: ICharacter | ICreature, category: string) {
    let httpHeader = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.loginSvc.jwtToken,
      }),
    };
    return this.http
      .put<ICharacter>(this.deploy_url + category, body, httpHeader)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        if (err.status == 401) {
          Swal.fire(
            'Unauthorized',
            'You are not logged in. Please go the login page in order to access this data.',
            'error'
          );
        } else if (err.status == 400) {
          Swal.fire(
            'Bad request',
            err.error.title + this.formatErrors(err.error.errors),
            'warning'
          );
        } else if (err.status == 404) {
          Swal.fire('Not found', err.error, 'error');
        } else if (err.status == 0) {
          Swal.fire(
            'No connection',
            'There is no connection with the backend. The API seems to be down... Try again later.',
            'error'
          );
        } else {
          Swal.fire('Error', 'An error occured', 'error');
        }
      });
  }

  formatErrors(errorList: any) {
    let validationErrorMessage = ' ';
    if (errorList.Name != null) validationErrorMessage += errorList.Name + ' ';
    if (errorList.VoiceActorID != null)
      validationErrorMessage += errorList.VoiceActorID + ' ';
    if (errorList.AbilityID != null)
      validationErrorMessage += errorList.AbilityID + ' ';
    if (errorList.AffiliationID != null)
      validationErrorMessage += errorList.AffiliationID + ' ';
    if (errorList.SpeciesID != null)
      validationErrorMessage += errorList.SpeciesID + ' ';
    return validationErrorMessage;
  }

  // CHARACTER CALLS - NOT USED ANYMORE!!
  // Read
  // getAllCharacters(all: boolean) {
  //   if (all) {
  //     return this.http
  //       .get<ICharacter[]>(this.url + 'characters?length=99')
  //       .toPromise()
  //       .catch((err: HttpErrorResponse) => {
  //         if (err.status == 0) {
  //           Swal.fire(
  //             'No connection',
  //             'There is no connection with the backend. The API seems to be down... Try again later.',
  //             'error'
  //           );
  //         }
  //       });
  //   }
  //   return this.http.get<ICharacter[]>(this.url + 'characters/dto').toPromise();
  // }

  // getCharacterById(id: number) {
  //   return this.http
  //     .get<ICharacter>(this.url + 'characters/' + id)
  //     .toPromise()
  //     .catch((err: HttpErrorResponse) => {
  //       if (err.status == 404) {
  //         Swal.fire(
  //           'Not found',
  //           "The data you are trying to look up doesn't exist.",
  //           'error'
  //         );
  //       } else if (err.status == 0) {
  //         Swal.fire(
  //           'No connection',
  //           'There is no connection with the backend. The API seems to be down... Try again later.',
  //           'error'
  //         );
  //       } else {
  //         Swal.fire('Error', 'An error occured', 'error');
  //       }
  //     });
  // }

  // getAllCharactersWithSort(page: number, sort: string, dir: string) {
  //   return this.http
  //     .get<any>(
  //       this.url + 'characters?page=' + page + '&sort=' + sort + '&dir=' + dir
  //     )
  //     .toPromise();
  // }

  // getRelationForCharacter(id, relation: string) {
  //   return this.http
  //     .get<any>(this.url + 'characters/ ' + id + '/' + relation)
  //     .toPromise()
  //     .catch((error: HttpErrorResponse) => {
  //       Swal.fire(
  //         'Not found',
  //         "The data you are trying to look up doesn't exist.",
  //         'error'
  //       );
  //     });
  // }

  // // Create
  // createCharacter(body: ICharacter) {
  //   return this.http
  //     .post<any>(this.url + 'characters/', body)
  //     .toPromise()
  //     .catch((err: HttpErrorResponse) => {
  //       if (err.status == 400) {
  //         Swal.fire(
  //           'Bad request',
  //           err.error.title +
  //             ' Make sure that all the required fields are filled in.',
  //           'warning'
  //         );
  //       } else if (err.status == 404) {
  //         Swal.fire('Not found', err.error, 'error');
  //       } else {
  //         Swal.fire('Error', 'An error occured. Try again later.', 'error');
  //       }
  //     });
  // }

  // // Delete
  // deleteCharacter(id: number) {
  //   let httpHeader = {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.loginSvc.jwtToken,
  //     }),
  //   };
  //   return this.http
  //     .delete<any>(this.url + 'characters/' + id, httpHeader)
  //     .toPromise()
  //     .catch((err: HttpErrorResponse) => {
  //       if (err.status == 401) {
  //         Swal.fire(
  //           'Unauthorized',
  //           'You are not logged in. Please go the login page in order to access this data.',
  //           'error'
  //         );
  //       } else if (err.status == 404) {
  //         Swal.fire('Not found', err.error, 'error');
  //       } else {
  //         Swal.fire(
  //           'Not found',
  //           "The data you are trying to delete doesn't exist.",
  //           'error'
  //         );
  //       }
  //     });
  // }

  // // Update
  // updateCharacter(body: ICharacter) {
  //   let httpHeader = {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.loginSvc.jwtToken,
  //     }),
  //   };
  //   return this.http
  //     .put<ICharacter>(this.url + 'characters', body, httpHeader)
  //     .toPromise()
  //     .catch((err: HttpErrorResponse) => {
  //       if (err.status == 401) {
  //         Swal.fire(
  //           'Unauthorized',
  //           'You are not logged in. Please go the login page in order to access this data.',
  //           'error'
  //         );
  //       } else if (err.status == 400) {
  //         Swal.fire(
  //           'Bad request',
  //           err.error.title +
  //             ' Make sure that all the required fields are filled in.',
  //           'warning'
  //         );
  //         console.log(err);
  //       } else if (err.status == 404) {
  //         Swal.fire('Not found', err.error, 'error');
  //       } else {
  //         Swal.fire('Error', 'An error occured', 'error');
  //       }
  //     });
  // }

  // External API

  callExternalAPI(category: string, flag: string) {
    return this.http
      .get<IJoke>(this.external_url + category + '/blacklistFlags=' + flag)
      .toPromise();
  }
}

// Interfaces for external API
export interface IJoke {
  error: boolean;
  category: string;
  type: string;
  setup: string;
  delivery: string;
  flags: IFlags;
  id: number;
  safe: boolean;
  lang: string;
}

export interface IFlags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}

// INTERFACES
export interface ICharacter {
  id: number;
  name: string;
  appearsInEpisode?: any;
  isBender: boolean;
  isAvatar: boolean;
  ability: ISkill;
  abilityID: number;
  affiliationID: number;
  voicedBy: IVoiceActor;
  voiceActorID: number;
}

export interface IEpisode {
  id: number;
  title: string;
  book: number;
  description: string;
  airDate: Date;
  appearingCharacters?: any;
  appearingCreatures?: any;
  episodeNumber: number;
  overallNumber: number;
}

export interface ICreature {
  id: number;
  name: string;
  appearsInEpisode: IEpisode[];
  species: ISpecies;
  speciesID: number;
  affiliation: IOrganisation;
  affiliationID: number;
}

export interface ISkill {
  id: number;
  name: string;
  description: string;
}

export interface IOrganisation {
  id: number;
  name: string;
  description: string;
  emblem?: any;
  members?: any;
}

export interface ILocation {
  id: number;
  name: string;
  importantPlace: string;
  description: string;
  inhabitingSpecies?: any;
}

export interface IHabitat {
  id: number;
  name: string;
  importantPlace: string;
  description: string;
  inhabitingSpecies: ISpecies[];
}

export interface ISpecies {
  id: number;
  name: string;
  description: string;
  image: string;
  habitat: IHabitat;
  habitatId: number;
}

export interface IVoiceActor {
  id: number;
  name: string;
  birthDate: Date;
  deathDate: Date;
  link: string;
}

// CLASSES
export class Character implements ICharacter {
  id: number;
  name: string;
  appearsInEpisode?: any;
  isBender: boolean;
  isAvatar: boolean;
  ability: ISkill;
  abilityID: number;
  affiliationID: number;
  voicedBy: IVoiceActor;
  voiceActorID: number;

  constructor(
    name: string,
    isBender: boolean,
    isAvatar: boolean,
    abilityID: number,
    affiliationID: number,
    voiceActorId: number,
    episodes?: any[],
    id?: number
  ) {
    if (id) this.id = id;
    if (episodes) this.appearsInEpisode = episodes;
    this.name = name;
    this.isBender = isBender;
    this.isAvatar = isAvatar;
    this.abilityID = abilityID;
    this.affiliationID = affiliationID;
    this.voiceActorID = voiceActorId;
  }
}

export class Creature implements ICreature {
  id: number;
  name: string;
  appearsInEpisode: IEpisode[];
  species: ISpecies;
  speciesID: number;
  affiliation: IOrganisation;
  affiliationID: number;

  constructor(
    name: string,
    speciesID: number,
    affiliationID: number,
    episodes?: any[],
    id?: number
  ) {
    if (id) this.id = id;
    if (episodes) this.appearsInEpisode = episodes;
    this.name = name;
    this.speciesID = speciesID;
    this.affiliationID = affiliationID;
  }
}
