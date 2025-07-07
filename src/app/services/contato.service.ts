import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';

import { Observable, of, retry } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private readonly STORAGE_KEY = 'contatos';

  constructor() {}

  private getContatosFromStorage(): Contato[] {
    const contatos = localStorage.getItem(this.STORAGE_KEY);
    return contatos ? JSON.parse(contatos) : [];
  }

  private saveContatosToStorage(contatos: Contato[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contatos));
  }

  obterContatos(): Observable<Contato[]> {
    const contatos = this.getContatosFromStorage();
    return of(contatos);
  }

  salvarContatos(contato: Contato) {
    const contatos = this.getContatosFromStorage();
    contatos.push(contato);
    this.saveContatosToStorage(contatos);
    return of(contato);
  }

  buscarPorId(id: number): Observable<Contato> {
    const contatos = this.getContatosFromStorage().find(
      (contato) => contato.id === id
    );
    return of(contatos!);
  }

  excluirPorId(id: number): Observable<Contato> {
    const contatos = this.getContatosFromStorage(); // pega todos os contatos do localStorage
    const contatoExcluido = contatos.find((contato) => contato.id === id)!; // encontra o contato a ser excluído
    const contatosAtualizados = contatos.filter((contato) => contato.id !== id); // remove o contato da lista
    this.saveContatosToStorage(contatosAtualizados); // salva a lista atualizada no localStorage
    return of(contatoExcluido); // retorna o contato excluído como Observable
  }

  editarContato(contato: Contato): Observable<Contato> {
    const contatos = this.getContatosFromStorage();
    const indice = contatos.findIndex((c) => c.id === contato.id);
    if (indice !== -1) {
      contatos[indice] = contato;
      this.saveContatosToStorage(contatos);
    }
    return of(contato);
  }

  editarOuSalvarContato(contato: Contato) {
    if (contato.id) {
      return this.editarContato(contato);
    } else {
      return this.salvarContatos(contato);
    }
  }
}
