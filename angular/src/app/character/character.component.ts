import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  ApiService,
  ICharacter,
  IOrganisation,
  IVoiceActor,
  ISkill,
  Character,
  IEpisode,
} from '../services/api.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  categoryName: string = 'characters';
  characterList: ICharacter[] | void;
  character: ICharacter | void;
  queryCharacter: ICharacter | void;

  showCharactersButtonText: string = 'Show table';
  showCharacters: boolean = false;

  currentPage: number = 0;
  maxPage: number;

  voiceActor: IVoiceActor;
  showVoiceActor: boolean = false;
  voiceActorButtonText: string = 'Show voice actor';

  organisation: IOrganisation;
  showOrganisation: boolean = false;
  organisationButtonText: string = 'Show affiliation';

  skill: ISkill;
  showSkill: boolean = false;
  skillButtonText: string = 'Show ability';

  episodes: IEpisode[];
  showEpisodes: boolean = false;
  episodesButtonText: string = 'Show episodes';

  constructor(private apiSvc: ApiService) {}

  async ngOnInit(): Promise<void> {
    let data = await this.apiSvc.getAll(true, this.categoryName);
    if (data) {
      this.maxPage = Math.ceil(data.length / 4);
    }
  }

  reset() {
    this.voiceActor = null;
    this.showVoiceActor = false;
    this.voiceActorButtonText = 'Show voice actor';

    this.organisation = null;
    this.showOrganisation = false;
    this.organisationButtonText = 'Show organisation';

    this.skill = null;
    this.showSkill = false;
    this.skillButtonText = 'Show ability';

    this.episodes = null;
    this.showEpisodes = false;
    this.episodesButtonText = 'Show episodes';
  }

  resetQuery() {
    this.queryCharacter = null;
  }

  resetCharacter() {
    this.character = null;
  }

  switchPage(next: boolean, sort: string, dir: string) {
    if (next) {
      if (this.currentPage < this.maxPage - 1) {
        this.currentPage++;
      }
    } else {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    }
    this.callApiForSort(sort, dir);
  }

  refactorEpisodeList(list: string) {
    let nospace = list.replace(/\s/g, '');
    let splitted = nospace.split(',');
    let objectArray = [];
    splitted.forEach((id) => {
      let obj = {
        id: +id,
      };
      objectArray.push(obj);
    });
    return objectArray;
  }

  async callApiForAll() {
    if (this.showCharacters) {
      this.showCharactersButtonText = 'Show table';
      this.showCharacters = false;
      this.characterList = null;
    } else {
      this.showCharactersButtonText = 'Hide table';
      this.showCharacters = true;
      this.characterList = await this.apiSvc.getAll(false, this.categoryName);
    }
  }

  async callApiForQuery(name: string) {
    this.resetQuery();
    let res = await this.apiSvc.getByName(name, this.categoryName);
    if (res) this.queryCharacter = res[0];
  }

  async callApiForId(id: number) {
    this.character = await this.apiSvc.getById(id, this.categoryName);
    this.reset();
  }

  async callApiForSort(sort: string, dir: string) {
    this.characterList = await this.apiSvc.getAllWithSort(
      this.currentPage,
      sort,
      dir,
      this.categoryName
    );
  }

  async callApiForVoiceActor(id: number) {
    if (this.showVoiceActor) {
      this.voiceActorButtonText = 'Show voice actor';
      this.showVoiceActor = false;
      this.voiceActor = null;
    } else {
      this.voiceActorButtonText = 'Hide voice actor';
      this.showVoiceActor = true;
      this.voiceActor = await this.apiSvc.getRelation(
        id,
        'voiceactor',
        this.categoryName
      );
    }
  }

  async callApiForOrganisation(id: number) {
    if (this.showOrganisation) {
      this.organisationButtonText = 'Show affiliation';
      this.showOrganisation = false;
      this.organisation = null;
    } else {
      this.organisationButtonText = 'Hide affiliation';
      this.showOrganisation = true;
      this.organisation = await this.apiSvc.getRelation(
        id,
        'organisation',
        this.categoryName
      );
    }
  }

  async callApiForSkill(id: number) {
    if (this.showSkill) {
      this.skillButtonText = 'Show ability';
      this.showSkill = false;
      this.skill = null;
    } else {
      this.skillButtonText = 'Hide ability';
      this.showSkill = true;
      this.skill = await this.apiSvc.getRelation(
        id,
        'skill',
        this.categoryName
      );
    }
  }

  async callApiForEpisodes(id: number) {
    if (this.episodes) {
      this.episodesButtonText = 'Show episodes';
      this.showEpisodes = false;
      this.episodes = null;
    } else {
      this.episodesButtonText = 'Hide episodes';
      this.showEpisodes = true;
      this.episodes = await this.apiSvc.getRelation(
        id,
        'episodes',
        this.categoryName
      );
    }
  }

  async callApiForNewCharacter(
    name: string,
    voiceActorId: number,
    skillId: number,
    organisationId: number,
    isBender: boolean,
    isAvater: boolean,
    appearsInEpisode: string
  ) {
    let episodes = [];
    if (appearsInEpisode != '') {
      episodes = this.refactorEpisodeList(appearsInEpisode);
    }

    let newCharacter = new Character(
      name,
      isBender,
      isAvater,
      skillId,
      organisationId,
      voiceActorId,
      episodes
    );
    let res = await this.apiSvc.createObject(newCharacter, this.categoryName);
    if (res) {
      Swal.fire(
        'Succes',
        'Added new character named "' + res.name + '" to the database.',
        'success'
      );
    }

    // refresh list of data
    this.ngOnInit();
  }

  async callApiForDelete(id: number) {
    let res = this.apiSvc.deleteObject(id, this.categoryName);
    if (res) {
      Swal.fire(
        'Succes',
        'Deleted character with ID ' + id + ' from the database.',
        'success'
      );
    }

    // refresh list of data
    this.ngOnInit();
  }

  async callApiForUpdate(
    name: string,
    voiceActorId: number,
    skillId: number,
    organisationId: number,
    isBender: boolean,
    isAvatar: boolean,
    id: number,
    appearsInEpisode: string
  ) {
    let episodes = this.refactorEpisodeList(appearsInEpisode);
    let updatedCharacter = new Character(
      name,
      isBender,
      isAvatar,
      skillId,
      organisationId,
      voiceActorId,
      episodes,
      id
    );
    let res = this.apiSvc.updateObject(updatedCharacter, this.categoryName);
    if (res) {
      Swal.fire('Succes', 'Updated character with ID ' + id + '.', 'success');
    }
  }
}
