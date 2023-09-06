//src>app>components>pages>home>home.component.ts
import { Component, OnInit } from '@angular/core';

import { IMoment } from 'src/app/interfaces/Moment';

import { MomentService } from 'src/app/services/moment.service';

import { environment } from 'src/environments/environment';

//para nossa busca de momentos (futuramente)
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //vai receber resposta da requisição com todos os momentos
  allMoments: IMoment[] = [];

  //vai receber resposta da requisição com todos os momentos filtrados
  filteredMoments: IMoment[] = [];

  baseApiUrl = environment.baseApiUrl;

  //fazer barra de pesquisa
  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    //essa manipulação dos item é para formatar a data do created_at
    this.momentService.getMoment().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });
      this.allMoments = data;
      this.filteredMoments = data;
    });
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.filteredMoments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(value.toLowerCase())
    );
  }
}
