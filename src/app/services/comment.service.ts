//scr>app>services>comment.service.ts
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IComment } from '../interfaces/Comment'; 
import { IResponse } from '../interfaces/Response'; 

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/api/moments`;

  constructor(private http: HttpClient) {}

  createComment(data: IComment): Observable<IResponse<IComment>> {
    const url = `${this.apiUrl}/${data.momentId}/comments`;
    return this.http.post<IResponse<IComment>>(url, data);
  }
}
