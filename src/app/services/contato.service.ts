import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ContatoService {


  private readonly API = environment.apiUrl + '/contatos'

  constructor(private http: HttpClient) {

  }


  obterContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.API)
  }

  salvarContatos(contato: Contato){
   return this.http.post<Contato>(this.API, contato)
  }

  buscarPorId(id:number): Observable<Contato> {
    const url = `${this.API}/${id}`
    return this.http.get<Contato>(url)
  }

  excluirPorId(id:number): Observable<Contato> {
    const url = `${this.API}/${id}`
   return this.http.delete<Contato>(url)
  }

  editarContato(contato:Contato): Observable<Contato> {
    const url = `${this.API}/${contato.id}`
    return this.http.put<Contato>(url, contato)
  }

  editarOuSalvarContato(contato:Contato){
    if(contato.id){
     return this.editarContato(contato)
    }else{
      return this.salvarContatos(contato)
    }
  }

}
