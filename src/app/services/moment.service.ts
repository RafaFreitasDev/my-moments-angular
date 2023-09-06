//scr>app>services>moment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMoment } from '../interfaces/Moment';
import { IResponse } from '../interfaces/Response';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}/api/moments`

  constructor(private http: HttpClient) { }

  getMoment(): Observable<IResponse<IMoment[]>>{
    return this.http.get<IResponse<IMoment[]>>(this.apiUrl)
  }

  getMomentById(id:number): Observable<IResponse<IMoment>>{
    return this.http.get<IResponse<IMoment>>(`${this.apiUrl}/${id}`)
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  //estamos usando um PUT aqui pq ai ele só atualiza os dados que eu enviar
  updateMoment(id:number, formData: FormData): Observable<FormData> {
    return this.http.put<FormData>(`${this.apiUrl}/${id}`, formData)
  } 

  //como não retorna nada, colocar any na observação
  removeMoment(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }


}
