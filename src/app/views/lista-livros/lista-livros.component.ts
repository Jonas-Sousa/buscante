import { LivroVolumeInfo } from './../../models/livroVolumeInfo';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { switchMap, map, tap, filter, debounceTime } from 'rxjs';
import { Item } from 'src/app/models/Item.interface';
import { FormControl } from '@angular/forms';

const PAUSA = 400

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {


  campoBusca = new FormControl()

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
  .pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 4),
    tap(() => console.log('Fluxo')),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap((api) => console.log(api)),
    map((items) => this.livrosResultadoParaLivros(items)
    )
  )

  livrosResultadoParaLivros(itens: Item[]): LivroVolumeInfo[]{
      return itens.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

}



