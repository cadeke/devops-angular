import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  ApiService,
  ICreature,
  ISpecies,
  IOrganisation,
  Creature,
  IEpisode,
} from '../services/api.service';

@Component({
  selector: 'app-creature',
  templateUrl: './creature.component.html',
  styleUrls: ['./creature.component.css'],
})
export class CreatureComponent implements OnInit {
  categoryName: string = 'creatures';
  data: any;

  creatureList: ICreature[] | void;
  creature: ICreature | void;
  queryCreature: ICreature | void;

  showCreaturesButtonText: string = 'Show table';
  showCreatures: boolean = false;

  currentPage: number = 0;
  maxPage: number;

  species: ISpecies;
  showSpecies: boolean = false;
  speciesButtonText: string = 'Show species';

  organisation: IOrganisation;
  showOrganisation: boolean = false;
  organisationButtonText: string = 'Show affiliation';

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

  reset() {
    this.species = null;
    this.showSpecies = false;
    this.speciesButtonText = 'Show species';

    this.organisation = null;
    this.showOrganisation = false;
    this.organisationButtonText = 'Show organisation';

    this.episodes = null;
    this.showEpisodes = false;
    this.episodesButtonText = 'Show episodes';
  }

  resetQuery() {
    this.queryCreature = null;
  }

  resetCharacter() {
    this.creature = null;
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
    if (this.showCreatures) {
      this.showCreaturesButtonText = 'Show table';
      this.showCreatures = false;
      this.creatureList = null;
    } else {
      this.showCreaturesButtonText = 'Hide table';
      this.showCreatures = true;
      this.creatureList = await this.apiSvc.getAll(false, this.categoryName);
    }
  }

  async callApiForSort(sort: string, dir: string) {
    this.creatureList = await this.apiSvc.getAllWithSort(
      this.currentPage,
      sort,
      dir,
      this.categoryName
    );
  }

  async callApiForQuery(name: string) {
    this.resetQuery();
    let res = await this.apiSvc.getByName(name, this.categoryName);
    if (res) this.queryCreature = res[0];
  }

  async callApiForId(id: number) {
    this.creature = await this.apiSvc.getById(id, this.categoryName);
    this.reset();
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

  async callApiForSpecies(id: number) {
    if (this.showSpecies) {
      this.speciesButtonText = 'Show species';
      this.showSpecies = false;
      this.species = null;
    } else {
      this.speciesButtonText = 'Hide species';
      this.showSpecies = true;
      this.species = await this.apiSvc.getRelation(
        id,
        'species',
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

  async callApiForNewCreature(
    name: string,
    speciesId: number,
    organisationId: number,
    appearsInEpisode: string
  ) {
    let episodes = [];
    if (appearsInEpisode != '') {
      episodes = this.refactorEpisodeList(appearsInEpisode);
    }

    let newCreature = new Creature(name, speciesId, organisationId, episodes);
    let res = await this.apiSvc.createObject(newCreature, this.categoryName);
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
    speciesId: number,
    organisationId: number,
    id: number,
    appearsInEpisode: string
  ) {
    let episodes = this.refactorEpisodeList(appearsInEpisode);
    // FIXME: geeft nog error in API, kan niet saven
    let updatedCreature = new Creature(
      name,
      speciesId,
      organisationId,
      episodes,
      id
    );
    let res = this.apiSvc.updateObject(updatedCreature, this.categoryName);
    if (res) {
      Swal.fire('Succes', 'Updated character with ID ' + id + '.', 'success');
    }
  }
}
