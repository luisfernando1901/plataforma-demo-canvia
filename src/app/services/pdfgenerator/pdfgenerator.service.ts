import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
 
@Injectable({
  providedIn: 'root'
})
export class PdfgeneratorService {

  constructor() { }

  generatePdf(){
    const docDefinition = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', '*', 100, '*' ],
    
            body: [
              [ 'First', 'Second', 'Third', 'The last one' ],
              [ 'Value 1', 'Value 2', 'Value 333333333333333333333333333333333333333333333333333333333333333333333333333333333333333', 'Value 4' ],
              [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
            ]
          }
        }
      ]
    };
    pdfMake.createPdf(docDefinition).open();
   }
}
