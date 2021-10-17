import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';

@Injectable({
  providedIn: 'root'
})
export class PdfgeneratorService {
  bodySeccion1 = [[{text:'Pregunta',style:'simpleText'}, {text:'Cumple = 1',style:'simpleText'}, {text:'No cumple = 0',style:'simpleText'}]];
  bodySeccion2 = [[{text:'Pregunta',style:'simpleText'}, {text:'Cumple = 1',style:'simpleText'}, {text:'No cumple = 0',style:'simpleText'}]];
  bodySeccion3 = [[{text:'Pregunta',style:'simpleText'}, {text:'Cumple = 1',style:'simpleText'}, {text:'No cumple = 0',style:'simpleText'}]];
  bodySeccion4 = [[{text:'Pregunta',style:'simpleText'}, {text:'Cumple = 1',style:'simpleText'}, {text:'No cumple = 0',style:'simpleText'}]];

  constructor() { }

  generatePdf(index: number, templates: object) {
    let forms_templates: any = templates;
    let CACN_template = forms_templates.CACN_form;
    this.createCACNbodyPDF(CACN_template);
    let CACN_PDF: any = {
      content: [
        { text: 'CRITERIOS DE SUPERVISION A CUMPLIR ACORDADOS POR LA SECRETARIA DE AGRICULTURA Y GNADERIA DEL GOBIERNO DE SINALOA PARA CORRALES DE ACOPIO DE CONSUMO NACIONAL (CACN)', style: 'header' },
        { text: 'ESTATUS NA TB-SINALOA 2021', style: 'header' },
        { text: 'INFORMACIÓN GENERAL', style: 'titles' },
        { text: `PSG: INVENTARIO DE GANADO: GEOREFERENCIACION: FECHA: CACN: MVZ CACN: MVZ RA SUPERVISOR: `, style: 'simpleText' },
        //Sección 1
        { text: `${forms_templates.CACN_form.seccion1.titulo}`, style: 'titles' },
        //Tabla
        {
          layout: 'lightHorizontalLines', // optional,
          style:'tableContent',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [300, 100, 100],

            body: this.bodySeccion1
          }
        },
        //Sección 2
        { text: `${forms_templates.CACN_form.seccion2.titulo}`, style: 'titles' },
        //Tabla
        {
          layout: 'lightHorizontalLines', // optional,
          style:'tableContent',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [300, 100, 100],

            body: this.bodySeccion2
          }
        },
        //Sección 3
        { text: `${forms_templates.CACN_form.seccion3.titulo}`, style: 'titles' },
        //Tabla
        {
          layout: 'lightHorizontalLines', // optional,
          style:'tableContent',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [300, 100, 100],

            body: this.bodySeccion3
          }
        },
        //Sección 4
        { text: `${forms_templates.CACN_form.seccion4.titulo}`, style: 'titles' },
        //Tabla
        {
          layout: 'lightHorizontalLines', // optional,
          style:'tableContent',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [300, 100, 100],

            body: this.bodySeccion4
          }
        },
        //Observaciones y Acuerdos
        { text: 'OBSERVACIONES Y ACUERDOS', style: 'titles' },
      ],

      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: 'center'
        },
        titles: {
          fontSize: 10,
        },
        simpleText: {
          fontSize: 9,
        },
        tableContent: {
          fontSize: 7,
        }
      }
    };
    pdfMake.createPdf(CACN_PDF).open();
  }

  //Funcion para crear dinamicamente el body del pdf CACN
  createCACNbodyPDF(template:any) {
    var seccion1 = template.seccion1.questionario;
    var seccion2 = template.seccion2.questionario;
    var seccion3 = template.seccion3.questionario;
    var seccion4 = template.seccion4.questionario; 
    for (let index = 0; index < seccion1.length; index++) {
      const pregunta = seccion1[index].pregunta;
      const respuestas_1 = seccion1[index].respuestas['1'];
      const respuestas_0 = seccion1[index].respuestas['0'];
      this.bodySeccion1.push([pregunta,respuestas_1,respuestas_0]);
    }
    for (let index = 0; index < seccion2.length; index++) {
      const pregunta = seccion2[index].pregunta;
      const respuestas_1 = seccion2[index].respuestas['1'];
      const respuestas_0 = seccion2[index].respuestas['0'];
      this.bodySeccion2.push([pregunta,respuestas_1,respuestas_0]);
    }
    for (let index = 0; index < seccion3.length; index++) {
      const pregunta = seccion3[index].pregunta;
      const respuestas_1 = seccion3[index].respuestas['1'];
      const respuestas_0 = seccion3[index].respuestas['0'];
      this.bodySeccion3.push([pregunta,respuestas_1,respuestas_0]);
    }
    for (let index = 0; index < seccion4.length; index++) {
      const pregunta = seccion4[index].pregunta;
      const respuestas_1 = seccion4[index].respuestas['1'];
      const respuestas_0 = seccion4[index].respuestas['0'];
      this.bodySeccion4.push([pregunta,respuestas_1,respuestas_0]);
    }
  }

  //Funcion para crear dinamicamente el body del pdf CE
  createCEbodyPDF() {
    
  }

  //Funcion para crear dinamicamente el body del pdf CEA
  createCEAbodyPDF() {
    
  }
}
