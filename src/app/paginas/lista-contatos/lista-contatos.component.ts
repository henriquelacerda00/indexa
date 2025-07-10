import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { ContainerComponent } from '../../componentes/container/container.component';
import { ContatoComponent } from '../../componentes/contato/contato.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { ContatoService } from '../../services/contato.service';




import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Contato } from '../../componentes/contato/contato';


@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [CommonModule,
    ContainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css'
})


export class ListaContatosComponent implements OnInit{
  alfabeto: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  contatos : Contato[] = []

  filtrarTexto:string = ''

  constructor(private contatoService: ContatoService){

  }

  ngOnInit(){
    this.contatoService.obterContatos().subscribe(listaContatos => {
      this.contatos = listaContatos;
    });
  }

  filtrarAcentos(texto:string):string{
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  filtrarContatosPorTexto(): Contato[]{
    return this.contatos.filter(contato => {
      return this.filtrarAcentos(contato.nome).toLowerCase().includes(this.filtrarAcentos(this.filtrarTexto.toLowerCase()));
    })
  }

  filtrarContatos(letra:string): Contato[]{
    return this.filtrarContatosPorTexto().filter(contato => {
      return this.filtrarAcentos(contato.nome).toLowerCase().startsWith(this.filtrarAcentos(letra).toLowerCase())
    })
  }
}
