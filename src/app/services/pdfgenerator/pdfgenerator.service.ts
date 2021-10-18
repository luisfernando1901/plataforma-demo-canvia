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

  generatePdf(formAnswers: object, templates: object,type:string) {
    let forms_templates: any = templates;
    let PDF:any = {};
    if (type == 'CACN') {
      let CACN_template = forms_templates.CACN_form;
      this.createCACNbodyPDF(CACN_template);
      PDF = {
        content: [
          { text: 'CRITERIOS DE SUPERVISION A CUMPLIR ACORDADOS POR LA SECRETARIA DE AGRICULTURA Y GNADERIA DEL GOBIERNO DE SINALOA PARA CORRALES DE ACOPIO DE CONSUMO NACIONAL (CACN)', style: 'header' },
          { text: 'ESTATUS NA TB-SINALOA 2021', style: 'header' },
          { text: 'INFORMACIÓN GENERAL', style: 'titles', margin: [ 0, 8, 0, 4 ]  },
          { text: `PSG: INVENTARIO DE GANADO: GEOREFERENCIACION: FECHA: CACN: MVZ CACN: MVZ RA SUPERVISOR: `, style: 'simpleText' },
          //Sección 1
          { text: `${CACN_template.seccion1.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: `${CACN_template.seccion2.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: `${CACN_template.seccion3.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: `${CACN_template.seccion4.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: 'OBSERVACIONES Y ACUERDOS', style: 'titles', margin: [ 0, 8, 0, 4 ]  },
          {
            columns: [
              ['_________________________','_________________________','OFICIAL ESTATAL'],
              ['_________________________','_________________________','CACN'],
              ['_________________________','_________________________','CEFPP/SIN'],
            ],
            // optional space between columns
            columnGap: 10,
            style: 'firmas', margin: [ 0, 8, 0, 4 ] 
          }
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
            fontSize: 8,
          },
          firmas: {
            fontSize: 9,
            bold: true,
            alignment: 'center'
          }
        }
      };
    }
    if (type == 'CE') {
      let CE_template = forms_templates.CE_form;
      this.createCEbodyPDF(CE_template);
      PDF = {
        content: [
          { text: 'EVALUACION DEL CUMPLIMIENTO DE LOS REQUISITOS DE OPERACIÓN PARA LOS CORRALES DE ENGORDA (CE)', style: 'header' },
          { text: 'INFORMACIÓN GENERAL', style: 'titles', margin: [ 0, 8, 0, 4 ]  },
          { text: `Capacidad Instalada del Corral de Engorda: , Capacidad Utilizada del Corral de Engorda: , Numero de corrales Internos: , Existencia de corrales alternos o de cuarentena: , Numero de Autorización: , Vigencia de Autorización: , Médico Veterinario Responsable de la Supervisión: , Periodo de la Supervisión: , PSG del Corral de Engorda: `, style: 'simpleText' },
          //Sección 1
          { text: `${CE_template.seccion1.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: `${CE_template.seccion2.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: `${CE_template.seccion3.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: `${CE_template.seccion4.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: 'OBSERVACIONES Y ACUERDOS', style: 'titles', margin: [ 0, 8, 0, 4 ]  },
          {
            columns: [
              ['_________________________','_________________________','OFICIAL ESTATAL'],
              ['_________________________','_________________________','CACN'],
              ['_________________________','_________________________','CEFPP/SIN'],
            ],
            // optional space between columns
            columnGap: 10,
            style: 'firmas', margin: [ 0, 8, 0, 4 ] 
          }
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
            fontSize: 8,
          },
          firmas: {
            fontSize: 9,
            bold: true,
            alignment: 'center'
          }
        }
      };
    }
    if (type == 'CEA') {
      let CEA_template = forms_templates.CEA_form;
      this.createCEAbodyPDF(CEA_template);
      PDF = {
        content: [
          { text: 'EVALUACION DEL CUMPLIMIENTO DE LOS REQUISITOS DE OPERACIÓN PARA LOS CORRALES DE ENGORDA APROBADOS (CEA)', style: 'header' },
          { text: 'INFORMACIÓN GENERAL', style: 'titles', margin: [ 0, 8, 0, 4 ] },
          { text: `Capacidad instalada del corral de engorda: `, style: 'simpleText' },
          { text: `Capacidad utilizada del corral de engorda: `, style: 'simpleText' },
          { text: `Numero de corrales internos: `, style: 'simpleText' },
          { text: `Existencia de corrales alternos o de cuarentena: `, style: 'simpleText' },
          { text: `Numero de autorización: `, style: 'simpleText' },
          { text: `Vigencia de autorización: `, style: 'simpleText' },
          { text: `Médico Veterinario responsable del CEA: `, style: 'simpleText' },
          { text: `Médico Veterinario responsable de la supervisión: `, style: 'simpleText' },
          { text: `Periodo de la supervisión: `, style: 'simpleText' },
          { text: `PSG del corral de engorda: `, style: 'simpleText' },
          { text: `Georreferenciación: `, style: 'simpleText' },
          { text: `Número de cabezas en el CEA: `, style: 'simpleText' },
          { text: `Número de cabezas ingresadas al CEA: `, style: 'simpleText' },
          { text: `Cabezas engordadas: `, style: 'simpleText' },
          { text: `Cabezas egresadas del CEA para sacrificio en rastros: `, style: 'simpleText' },
          { text: `Número de cabezas muertas en el CEA: `, style: 'simpleText' },
          { text: `Número de cabezas en el CEA (último día del mes de evaluación): `, style: 'simpleText' },
          //Sección 1
          { text: `${CEA_template.seccion1.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: `${CEA_template.seccion2.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: `${CEA_template.seccion3.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: `${CEA_template.seccion4.titulo}`, style: 'titles', margin: [ 0, 8, 0, 4 ]  },
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
          { text: 'OBSERVACIONES Y ACUERDOS', style: 'titles', margin: [ 0, 8, 0, 4 ]  },
          {
            columns: [
              ['_________________________','AUTORIZACIÓN','_________________________','_________________________','MEDICO VETERINARIO RESPONSABLE AUTORIZADO EN EL AREA DE RUMIANTES RESPONSABLE DEL CORRAL'],
              ['_________________________','_________________________','SUPERVISOR DE CORRALES DE ENGORDA APROBADOS'],
              ['_________________________','_________________________','POR EL CORRAL DE ENGORDA APROBADO - TESTIGO']
            ],
            // optional space between columns
            columnGap: 10,
            style: 'firmas'
          },
          {
            columns: [
              ['_________________________','_________________________','POR LA DEPENDENCIA - TESTIGO'],
              ['_________________________','_________________________','OFICIAL ESTATAL']
            ],
            // optional space between columns
            columnGap: 10,
            style: 'firmas'
          }
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
            fontSize: 8,
          },
          firmas: {
            fontSize: 9,
            bold: true,
            alignment: 'center'
          },
        }
      };
    };
    pdfMake.createPdf(PDF).open();
    this.bodySeccion1 = [[{text:'Pregunta',style:'simpleText'}, {text:'Cumple = 1',style:'simpleText'}, {text:'No cumple = 0',style:'simpleText'}]];
    this.bodySeccion2 = [[{text:'Pregunta',style:'simpleText'}, {text:'Cumple = 1',style:'simpleText'}, {text:'No cumple = 0',style:'simpleText'}]];
    this.bodySeccion3 = [[{text:'Pregunta',style:'simpleText'}, {text:'Cumple = 1',style:'simpleText'}, {text:'No cumple = 0',style:'simpleText'}]];
    this.bodySeccion4 = [[{text:'Pregunta',style:'simpleText'}, {text:'Cumple = 1',style:'simpleText'}, {text:'No cumple = 0',style:'simpleText'}]];
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
  createCEbodyPDF(template:any) {
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

  //Funcion para crear dinamicamente el body del pdf CEA
  createCEAbodyPDF(template:any) {
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
}
