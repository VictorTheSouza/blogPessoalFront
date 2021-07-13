import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema= new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token ==''){
      alert('sua sessão expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }

    if(environment.tipo != 'adm'){
      this.alertas.showAlertDanger('Você precisa ser adm para acessar isso')
      this.router.navigate(['/inicio'])
    }

    this.findAllTema()
  }

  findAllTema(){
    this.temaService.getAllTema().subscribe((resp:Tema[]) => {
      this.listaTemas = resp
    })
  }
  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp:Tema)=>{
    this.tema=resp
    alert("Tema cadastrado com sucesso")
    this.findAllTema()
    this.tema=new Tema()
  })
  }
}
