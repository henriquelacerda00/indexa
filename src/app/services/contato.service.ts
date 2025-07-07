import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';
import { Observable, of } from 'rxjs';

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

  salvarContatos(contato: Contato): Observable<Contato> {
    const contatos = this.getContatosFromStorage();

    contato.id = new Date().getTime();

    contatos.push(contato);
    this.saveContatosToStorage(contatos);
    return of(contato);
  }

  buscarPorId(id: number): Observable<Contato | undefined> {
    const contato = this.getContatosFromStorage().find((c) => c.id === id);
    return of(contato);
  }

  excluirPorId(id: number): Observable<Contato | undefined> {
    const contatos = this.getContatosFromStorage();
    const contatoExcluido = contatos.find((c) => c.id === id);

    if (!contatoExcluido) {
      return of(undefined);
    }

    const contatosAtualizados = contatos.filter((c) => c.id !== id);
    this.saveContatosToStorage(contatosAtualizados);
    return of(contatoExcluido);
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

  editarOuSalvarContato(contato: Contato): Observable<Contato> {
    if (contato.id) {
      return this.editarContato(contato);
    } else {
      return this.salvarContatos(contato);
    }
  }
}
