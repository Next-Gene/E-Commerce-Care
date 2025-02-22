import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(sentence: string|any, wordLimit: number): string {
    const sentenceArr = sentence.split(' ');
    if (sentenceArr.length > 3) {
      const truncatedSentence = sentenceArr.splice(0, wordLimit);
      return truncatedSentence.join(' ') + '...';
    }
    return sentence;
  }
}
