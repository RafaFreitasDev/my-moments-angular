//src>app>components>pages>edit-moment>edit-moment.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { IMoment } from 'src/app/interfaces/Moment';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.scss'],
})
export class EditMomentComponent implements OnInit {
  moment!: IMoment
  btnText: string = "Editar"

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesSevice: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //vamos preencher o formulário
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.momentService.getMomentById(id).subscribe(item=>this.moment=item.data)
  }

  async editHandler(momentData: IMoment){
    const id = this.moment.id

    const formData = new FormData()

    formData.append('title', momentData.title)
    formData.append('description', momentData.description)

    if(momentData.image) {
      formData.append('image', momentData.image)
    }

    await this.momentService.updateMoment(id!, formData).subscribe()

    this.messagesSevice.add(`Momento de ID ${id} foi atualizado!`)

    setTimeout(()=>{
      this.router.navigate(['/'])
    },500)
    
  }
}
