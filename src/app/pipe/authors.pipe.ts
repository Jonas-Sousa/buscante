import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authors'
})
export class AuthorsPipe implements PipeTransform {

  transform(autoria: string[]): string {
    if(autoria) {
      return autoria[0]
    }
    return ''
  }

}
