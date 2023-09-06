//src>app>components>pages>moment>moment.component.ts
import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { IMoment } from 'src/app/interfaces/Moment';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';

import { IComment } from 'src/app/interfaces/Comment';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss'],
})
export class MomentComponent implements OnInit {
  moment?: IMoment;
  baseApiUrl = environment.baseApiUrl

  faTimes = faTimes
  faEdit = faEdit

  commentForm!: FormGroup

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    /*o subscribe é quando eu faço a atribuição; neste caso eu pego a 
    resposta da api e atribuo a propriedade moment*/
    this.momentService
      .getMomentById(id)
      .subscribe((momentRes) => (this.moment = momentRes.data));

      this.commentForm = new FormGroup({
        text: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
      });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id:number) {
    
    await this.momentService.removeMoment(id).subscribe()

    //vamos utilizar o serviço de mensageria, tem que colocar no constructor
    this.messagesService.add('Momento excluido com sucesso!')

    //vamos colocar um direcionamento para outra página, colocar no constructor tbm
    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: IComment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    /*o subscrib é ém momentários (moment.coments) a ! é pq comentários não
    é obrigatório; momente requer ! pque lá em cima ele inicia com ?; e o push é pq
    a gente está adicionando o comentário no array de comentários*/
    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add(`Comentário adicionado!`);

    //limpar formulário
    this.commentForm.reset();
    //limpar formulário, precisa desse tbm
    formDirective.resetForm();
  }
  
}
