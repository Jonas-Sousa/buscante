import { LivroVolumeInfo } from './../../models/livroVolumeInfo';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/Livro.interface';
import { Item } from 'src/app/models/Item.interface';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: Livro[]
  campoBusca: string = ''
  subscription: Subscription
  livro: Livro

  constructor(private service: LivroService) { }

  buscarLivros(){
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (items) => {
        this.listaLivros = this.livrosResultadoParaLivros(items)
      },
      error: erro => console.log(erro)

    })
    this.campoBusca = ''
  }

  livrosResultadoParaLivros(itens: Item[]): LivroVolumeInfo[]{
      return itens.map(item => {
      return new LivroVolumeInfo(item)
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}



