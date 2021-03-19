import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'base64'
})
export class Base64Pipe implements PipeTransform {

  transform(value: string): string {
    return 'data:image/jpeg;base64,' + value;
  }
}
