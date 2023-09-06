//src>app>components>moment-form>moment-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMoment } from 'src/app/interfaces/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.scss'],
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit: EventEmitter<IMoment> = new EventEmitter();
  @Input() btnText!: string;
  @Input() momentData: IMoment | null = null;

  //precisa importar FormGroup
  //precisou da ! poque ele vai ser inicializado com o tempo
  momentForm!: FormGroup;

 
  constructor() {}

  //vai precisar importar o FormControl e o Validators também
  //estamos inicializando o nosso formulário
  //vamos ter um disparo de validação nos 2 campos do formulario (title, description)
  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.momentData ? this.momentData.description : '',
        [Validators.required]
      ),
      image: new FormControl(''),
     
    });
   
  }

  
  //ainda temos que inicializar as prorpiedades
  //a ! estou garantido que esses valores irão existir
  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    //poderiamos pegar várias imagens, mas só estamos pegando uma
    const file: File = event.target.files[0];

    this.momentForm.patchValue({ image: file });
  }

  submit(): void {
    if (this.momentForm.invalid) {
      return;
    }
    // console.log(this.momentForm.value)
    this.onSubmit.emit(this.momentForm.value);
  }
}
