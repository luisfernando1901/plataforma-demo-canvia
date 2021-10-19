import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';

@Injectable({
  providedIn: 'root'
})
export class PdfgeneratorService {
  bodySeccion1 = [[{ text: 'Pregunta', style: 'simpleText' }, { text: 'Cumple = 1', style: 'simpleText' }, { text: 'No cumple = 0', style: 'simpleText' }]];
  bodySeccion2 = [[{ text: 'Pregunta', style: 'simpleText' }, { text: 'Cumple = 1', style: 'simpleText' }, { text: 'No cumple = 0', style: 'simpleText' }]];
  bodySeccion3 = [[{ text: 'Pregunta', style: 'simpleText' }, { text: 'Cumple = 1', style: 'simpleText' }, { text: 'No cumple = 0', style: 'simpleText' }]];
  bodySeccion4 = [[{ text: 'Pregunta', style: 'simpleText' }, { text: 'Cumple = 1', style: 'simpleText' }, { text: 'No cumple = 0', style: 'simpleText' }]];
  //Answer body seccion
  answerBodySeccion1 = [[{ text: '#', style: 'simpleText' }, { text: 'Respuesta', style: 'simpleText' }, { text: 'Observaciones', style: 'simpleText' }, { text: 'Observaciones del médico', style: 'simpleText' }, { text: 'Fecha de cumplimiento', style: 'simpleText' }]];
  answerBodySeccion2 = [[{ text: '#', style: 'simpleText' }, { text: 'Respuesta', style: 'simpleText' }, { text: 'Observaciones', style: 'simpleText' }, { text: 'Observaciones del médico', style: 'simpleText' }, { text: 'Fecha de cumplimiento', style: 'simpleText' }]];
  answerBodySeccion3 = [[{ text: '#', style: 'simpleText' }, { text: 'Respuesta', style: 'simpleText' }, { text: 'Observaciones', style: 'simpleText' }, { text: 'Observaciones del médico', style: 'simpleText' }, { text: 'Fecha de cumplimiento', style: 'simpleText' }]];
  answerBodySeccion4 = [[{ text: '#', style: 'simpleText' }, { text: 'Respuesta', style: 'simpleText' }, { text: 'Observaciones', style: 'simpleText' }, { text: 'Observaciones del médico', style: 'simpleText' }, { text: 'Fecha de cumplimiento', style: 'simpleText' }]];

  constructor() { }

  generatePdf(formAnswers: any, templates: object, type: string) {
    let forms_templates: any = templates;
    let PDF: any = {};
    if (type == 'CACN') {
      let CACN_template = forms_templates.CACN_form;
      this.createCACNbodyPDF(CACN_template, formAnswers);
      PDF = {
        content: [
          { text: 'CRITERIOS DE SUPERVISION A CUMPLIR ACORDADOS POR LA SECRETARIA DE AGRICULTURA Y GNADERIA DEL GOBIERNO DE SINALOA PARA CORRALES DE ACOPIO DE CONSUMO NACIONAL (CACN)', style: 'header' },
          { text: 'ESTATUS NA TB-SINALOA 2021', style: 'header' },
          { text: `Folio: ${formAnswers.folio}`, style: 'header' },
          { text: 'INFORMACIÓN GENERAL', style: 'titles', margin: [0, 8, 0, 4] },
          { text: `PSG: ${formAnswers.general_info.infoCliente.PSG}`, style: 'simpleText' },
          { text: `INVENTARIO DE GANADO: ${formAnswers.form.inventario_de_ganado}`, style: 'simpleText' },
          { text: `GEOREFERENCIACION: ${formAnswers.general_info.infoCliente.LATITUD} , ${formAnswers.general_info.infoCliente.LONGITUD}`, style: 'simpleText' },
          { text: `FECHA: ${formAnswers.general_info.fechaDeCaptura}`, style: 'simpleText' },
          { text: `CACN: ${formAnswers.form.CACN}`, style: 'simpleText' },
          { text: `MVZ CACN: ${formAnswers.form.MVZ_CACN}`, style: 'simpleText' },
          { text: `MVZ RA SUPERVISOR: ${formAnswers.form.MVZ_RA_SUPERVISOR}`, style: 'simpleText' },
          //Sección 1
          { text: `${CACN_template.seccion1.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion1
            }
          },
          //Sección 2
          { text: `${CACN_template.seccion2.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion2
            }
          },
          //Sección 3
          { text: `${CACN_template.seccion3.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion3
            }
          },
          //Sección 4
          { text: `${CACN_template.seccion4.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion4
            }
          },
          //Observaciones y Acuerdos
          { text: 'OBSERVACIONES Y ACUERDOS', style: 'titles', margin: [0, 8, 0, 4] },
          { text: 'PRIMERA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion1
            }
          },
          { text: 'SEGUNDA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion2
            }
          },
          { text: 'TERCERA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion3
            }
          },
          { text: 'CUARTA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion4
            }
          },
          //Calificación
          { text: `Calificación: ${formAnswers.form.calificacion} %`, style: 'header', margin: [0, 16, 0, 4] },
          //Firmas
          {
            columns: [
              [{text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'OFICIAL ESTATAL'],
              [{text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'CACN'],
              [{text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'CEFPP/SIN'],
            ],
            // optional space between columns
            columnGap: 10,
            style: 'firmas', margin: [0, 8, 0, 4]
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
      this.createCEbodyPDF(CE_template, formAnswers);
      PDF = {
        content: [
          { text: 'EVALUACION DEL CUMPLIMIENTO DE LOS REQUISITOS DE OPERACIÓN PARA LOS CORRALES DE ENGORDA (CE)', style: 'header' },
          { text: `Folio: ${formAnswers.folio}`, style: 'header' },
          { text: 'INFORMACIÓN GENERAL', style: 'titles', margin: [0, 8, 0, 4] },
          { text: `Capacidad Instalada del Corral de Engorda: ${formAnswers.form.capacidad_instalada}`, style: 'simpleText' },
          { text: `Capacidad Utilizada del Corral de Engorda: ${formAnswers.form.capacidad_utilizada}`, style: 'simpleText' },
          { text: `Numero de corrales Internos: ${formAnswers.form.numero_corrales_internos}`, style: 'simpleText' },
          { text: `Existencia de corrales alternos o de cuarentena: ${formAnswers.form.existencia_corrales_alternos_o_cuarentena}`, style: 'simpleText' },
          { text: `Numero de Autorización: ${formAnswers.form.numero_de_autorizacion}`, style: 'simpleText' },
          { text: `Vigencia de Autorización: ${formAnswers.form.vigencia_de_autorizacion}`, style: 'simpleText' },
          { text: `Médico Veterinario Responsable de la Supervisión: ${formAnswers.form.medico_veterinario_responsable_de_supervision}`, style: 'simpleText' },
          { text: `Periodo de la Supervisión: ${formAnswers.form.periodo_de_supervision}`, style: 'simpleText' },
          { text: `PSG del Corral de Engorda: ${formAnswers.general_info.infoCliente.PSG}`, style: 'simpleText' },
          //Sección 1
          { text: `${CE_template.seccion1.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion1
            }
          },
          //Sección 2
          { text: `${CE_template.seccion2.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion2
            }
          },
          //Sección 3
          { text: `${CE_template.seccion3.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion3
            }
          },
          //Sección 4
          { text: `${CE_template.seccion4.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion4
            }
          },
          //Observaciones y Acuerdos
          { text: 'OBSERVACIONES Y ACUERDOS', style: 'titles', margin: [0, 8, 0, 4] },
          { text: 'PRIMERA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion1
            }
          },
          { text: 'SEGUNDA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion2
            }
          },
          { text: 'TERCERA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion3
            }
          },
          { text: 'CUARTA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion4
            }
          },
          //Calificación
          { text: `Calificación: ${formAnswers.form.calificacion} %`, style: 'header', margin: [0, 16, 0, 4] },
          //Firmas
          {
            columns: [
              [{text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'OFICIAL ESTATAL'],
              [{text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'CACN'],
              [{text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'CEFPP/SIN'],
            ],
            // optional space between columns
            columnGap: 10,
            style: 'firmas', margin: [0, 8, 0, 4]
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
      this.createCEAbodyPDF(CEA_template, formAnswers);
      PDF = {
        content: [
          { text: 'EVALUACION DEL CUMPLIMIENTO DE LOS REQUISITOS DE OPERACIÓN PARA LOS CORRALES DE ENGORDA APROBADOS (CEA)', style: 'header' },
          { text: `Folio: ${formAnswers.folio}`, style: 'header' },
          { text: 'INFORMACIÓN GENERAL', style: 'titles', margin: [0, 8, 0, 4] },
          { text: `Capacidad instalada del corral de engorda: ${formAnswers.form.capacidad_instalada}`, style: 'simpleText' },
          { text: `Capacidad utilizada del corral de engorda: ${formAnswers.form.capacidad_utilizada}`, style: 'simpleText' },
          { text: `Numero de corrales internos: ${formAnswers.form.numero_corrales_internos}`, style: 'simpleText' },
          { text: `Existencia de corrales alternos o de cuarentena: ${formAnswers.form.existencia_corrales_alternos_o_cuarentena}`, style: 'simpleText' },
          { text: `Numero de autorización: ${formAnswers.form.numero_de_autorizacion}`, style: 'simpleText' },
          { text: `Vigencia de autorización: ${formAnswers.form.vigencia_de_autorizacion}`, style: 'simpleText' },
          { text: `Médico Veterinario responsable del CEA: ${formAnswers.form.medico_veterinario_responsable_del_CEA}`, style: 'simpleText' },
          { text: `Médico Veterinario responsable de la supervisión: ${formAnswers.form.medico_veterinario_responsable_de_supervision}`, style: 'simpleText' },
          { text: `Periodo de la supervisión: ${formAnswers.form.periodo_de_supervision}`, style: 'simpleText' },
          { text: `PSG del corral de engorda: ${formAnswers.general_info.infoCliente.PSG}`, style: 'simpleText' },
          { text: `Georreferenciación: ${formAnswers.general_info.infoCliente.LATITUD} , ${formAnswers.general_info.infoCliente.LONGITUD}`, style: 'simpleText' },
          { text: `Número de cabezas en el CEA: ${formAnswers.form.numero_de_cabezas_en_el_CEA}`, style: 'simpleText' },
          { text: `Número de cabezas ingresadas al CEA: ${formAnswers.form.numero_de_cabezas_ingresadas_al_CEA}`, style: 'simpleText' },
          { text: `Cabezas engordadas: ${formAnswers.form.cabezas_engordadas}`, style: 'simpleText' },
          { text: `Cabezas egresadas del CEA para sacrificio en rastros: ${formAnswers.form.cabezas_egresadas_del_CEA_para_sacrificio_en_rastros}`, style: 'simpleText' },
          { text: `Número de cabezas muertas en el CEA: ${formAnswers.form.numero_cabezas_muertas_en_el_CEA}`, style: 'simpleText' },
          { text: `Número de cabezas en el CEA (último día del mes de evaluación): ${formAnswers.form.numero_cabezas_en_el_CEA_ultimo_dia_mes_evaluacion}`, style: 'simpleText' },
          //Sección 1
          { text: `${CEA_template.seccion1.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion1
            }
          },
          //Sección 2
          { text: `${CEA_template.seccion2.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion2
            }
          },
          //Sección 3
          { text: `${CEA_template.seccion3.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion3
            }
          },
          //Sección 4
          { text: `${CEA_template.seccion4.titulo}`, style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [300, 100, 100],

              body: this.bodySeccion4
            }
          },
          //Observaciones y Acuerdos
          { text: 'OBSERVACIONES Y ACUERDOS', style: 'titles', margin: [0, 8, 0, 4] },
          { text: 'PRIMERA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion1
            }
          },
          { text: 'SEGUNDA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion2
            }
          },
          { text: 'TERCERA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion3
            }
          },
          { text: 'CUARTA SECCIÓN', style: 'titles', margin: [0, 8, 0, 4] },
          //Tabla
          {
            layout: 'lightHorizontalLines', // optional,
            style: 'tableContent',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [20, 50, 150, 150, 80],

              body: this.answerBodySeccion4
            }
          },
          //Calificación
          { text: `Calificación: ${formAnswers.form.calificacion} %`, style: 'header', margin: [0, 16, 0, 4] },
          {
            columns: [
              [{text:'_________________________',margin:[0,16,0,4]}, 'AUTORIZACIÓN', {text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'MEDICO VETERINARIO RESPONSABLE AUTORIZADO EN EL AREA DE RUMIANTES RESPONSABLE DEL CORRAL'],
              [{text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'SUPERVISOR DE CORRALES DE ENGORDA APROBADOS'],
              [{text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'POR EL CORRAL DE ENGORDA APROBADO - TESTIGO']
            ],
            // optional space between columns
            columnGap: 10,
            style: 'firmas'
          },
          {
            columns: [
              [{text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'POR LA DEPENDENCIA - TESTIGO'],
              [{text:'_________________________',margin:[0,16,0,4]}, {text:'_________________________',margin:[0,16,0,4]}, 'OFICIAL ESTATAL']
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
    //Reset de los body
    this.bodySeccion1 = [[{ text: 'Pregunta', style: 'simpleText' }, { text: 'Cumple = 1', style: 'simpleText' }, { text: 'No cumple = 0', style: 'simpleText' }]];
    this.bodySeccion2 = [[{ text: 'Pregunta', style: 'simpleText' }, { text: 'Cumple = 1', style: 'simpleText' }, { text: 'No cumple = 0', style: 'simpleText' }]];
    this.bodySeccion3 = [[{ text: 'Pregunta', style: 'simpleText' }, { text: 'Cumple = 1', style: 'simpleText' }, { text: 'No cumple = 0', style: 'simpleText' }]];
    this.bodySeccion4 = [[{ text: 'Pregunta', style: 'simpleText' }, { text: 'Cumple = 1', style: 'simpleText' }, { text: 'No cumple = 0', style: 'simpleText' }]];
    this.answerBodySeccion1 = [[{ text: '#', style: 'simpleText' }, { text: 'Respuesta', style: 'simpleText' }, { text: 'Observaciones', style: 'simpleText' }, { text: 'Observaciones del médico', style: 'simpleText' }, { text: 'Fecha de cumplimiento', style: 'simpleText' }]];
    this.answerBodySeccion2 = [[{ text: '#', style: 'simpleText' }, { text: 'Respuesta', style: 'simpleText' }, { text: 'Observaciones', style: 'simpleText' }, { text: 'Observaciones del médico', style: 'simpleText' }, { text: 'Fecha de cumplimiento', style: 'simpleText' }]];
    this.answerBodySeccion3 = [[{ text: '#', style: 'simpleText' }, { text: 'Respuesta', style: 'simpleText' }, { text: 'Observaciones', style: 'simpleText' }, { text: 'Observaciones del médico', style: 'simpleText' }, { text: 'Fecha de cumplimiento', style: 'simpleText' }]];
    this.answerBodySeccion4 = [[{ text: '#', style: 'simpleText' }, { text: 'Respuesta', style: 'simpleText' }, { text: 'Observaciones', style: 'simpleText' }, { text: 'Observaciones del médico', style: 'simpleText' }, { text: 'Fecha de cumplimiento', style: 'simpleText' }]];
  }

  //Funcion para crear dinamicamente el body del pdf CACN
  createCACNbodyPDF(template: any, answers: any) {
    var seccion1 = template.seccion1.questionario;
    var seccion2 = template.seccion2.questionario;
    var seccion3 = template.seccion3.questionario;
    var seccion4 = template.seccion4.questionario;
    var answer_seccion1 = answers.form.CACN_answersSection1;
    var answer_seccion2 = answers.form.CACN_answersSection2;
    var answer_seccion3 = answers.form.CACN_answersSection3;
    var answer_seccion4 = answers.form.CACN_answersSection4;
    //Creación del body del template de formulario
    for (let index = 0; index < seccion1.length; index++) {
      const pregunta = seccion1[index].pregunta;
      const respuestas_1 = seccion1[index].respuestas['1'];
      const respuestas_0 = seccion1[index].respuestas['0'];
      this.bodySeccion1.push([pregunta, respuestas_1, respuestas_0]);
    }
    for (let index = 0; index < seccion2.length; index++) {
      const pregunta = seccion2[index].pregunta;
      const respuestas_1 = seccion2[index].respuestas['1'];
      const respuestas_0 = seccion2[index].respuestas['0'];
      this.bodySeccion2.push([pregunta, respuestas_1, respuestas_0]);
    }
    for (let index = 0; index < seccion3.length; index++) {
      const pregunta = seccion3[index].pregunta;
      const respuestas_1 = seccion3[index].respuestas['1'];
      const respuestas_0 = seccion3[index].respuestas['0'];
      this.bodySeccion3.push([pregunta, respuestas_1, respuestas_0]);
    }
    for (let index = 0; index < seccion4.length; index++) {
      const pregunta = seccion4[index].pregunta;
      const respuestas_1 = seccion4[index].respuestas['1'];
      const respuestas_0 = seccion4[index].respuestas['0'];
      this.bodySeccion4.push([pregunta, respuestas_1, respuestas_0]);
    }
    //Creación del body de Observaciones y acuerdos del formulario
    for (let index = 0; index < answer_seccion1.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion1[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion1[index].observaciones;
        const observacionesDelMedico = answer_seccion1[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion1[index].fechaDeCumplimiento;
        this.answerBodySeccion1.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
    for (let index = 0; index < answer_seccion2.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion2[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion2[index].observaciones;
        const observacionesDelMedico = answer_seccion2[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion2[index].fechaDeCumplimiento;
        this.answerBodySeccion2.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
    for (let index = 0; index < answer_seccion3.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion3[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion3[index].observaciones;
        const observacionesDelMedico = answer_seccion3[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion3[index].fechaDeCumplimiento;
        this.answerBodySeccion3.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
    for (let index = 0; index < answer_seccion4.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion4[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion4[index].observaciones;
        const observacionesDelMedico = answer_seccion4[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion4[index].fechaDeCumplimiento;
        this.answerBodySeccion4.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
  }

  //Funcion para crear dinamicamente el body del pdf CE
  createCEbodyPDF(template: any, answers: any) {
    var seccion1 = template.seccion1.questionario;
    var seccion2 = template.seccion2.questionario;
    var seccion3 = template.seccion3.questionario;
    var seccion4 = template.seccion4.questionario;
    var answer_seccion1 = answers.form.CE_answersSection1;
    var answer_seccion2 = answers.form.CE_answersSection2;
    var answer_seccion3 = answers.form.CE_answersSection3;
    var answer_seccion4 = answers.form.CE_answersSection4;

    //Creación del body del template de formulario
    for (let index = 0; index < seccion1.length; index++) {
      const pregunta = seccion1[index].pregunta;
      const respuestas_1 = seccion1[index].respuestas['1'];
      const respuestas_0 = seccion1[index].respuestas['0'];
      this.bodySeccion1.push([pregunta, respuestas_1, respuestas_0]);
    }
    for (let index = 0; index < seccion2.length; index++) {
      const pregunta = seccion2[index].pregunta;
      const respuestas_1 = seccion2[index].respuestas['1'];
      const respuestas_0 = seccion2[index].respuestas['0'];
      this.bodySeccion2.push([pregunta, respuestas_1, respuestas_0]);
    }
    for (let index = 0; index < seccion3.length; index++) {
      const pregunta = seccion3[index].pregunta;
      const respuestas_1 = seccion3[index].respuestas['1'];
      const respuestas_0 = seccion3[index].respuestas['0'];
      this.bodySeccion3.push([pregunta, respuestas_1, respuestas_0]);
    }
    for (let index = 0; index < seccion4.length; index++) {
      const pregunta = seccion4[index].pregunta;
      const respuestas_1 = seccion4[index].respuestas['1'];
      const respuestas_0 = seccion4[index].respuestas['0'];
      this.bodySeccion4.push([pregunta, respuestas_1, respuestas_0]);
    }
    //Creación del body de Observaciones y acuerdos del formulario
    for (let index = 0; index < answer_seccion1.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion1[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion1[index].observaciones;
        const observacionesDelMedico = answer_seccion1[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion1[index].fechaDeCumplimiento;
        this.answerBodySeccion1.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
    for (let index = 0; index < answer_seccion2.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion2[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion2[index].observaciones;
        const observacionesDelMedico = answer_seccion2[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion2[index].fechaDeCumplimiento;
        this.answerBodySeccion2.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
    for (let index = 0; index < answer_seccion3.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion3[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion3[index].observaciones;
        const observacionesDelMedico = answer_seccion3[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion3[index].fechaDeCumplimiento;
        this.answerBodySeccion3.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
    for (let index = 0; index < answer_seccion4.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion4[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion4[index].observaciones;
        const observacionesDelMedico = answer_seccion4[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion4[index].fechaDeCumplimiento;
        this.answerBodySeccion4.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
  }

  //Funcion para crear dinamicamente el body del pdf CEA
  createCEAbodyPDF(template: any, answers: any) {
    var seccion1 = template.seccion1.questionario;
    var seccion2 = template.seccion2.questionario;
    var seccion3 = template.seccion3.questionario;
    var seccion4 = template.seccion4.questionario;
    var answer_seccion1 = answers.form.CEA_answersSection1;
    var answer_seccion2 = answers.form.CEA_answersSection2;
    var answer_seccion3 = answers.form.CEA_answersSection3;
    var answer_seccion4 = answers.form.CEA_answersSection4;

    //Creación del body del template de formulario
    for (let index = 0; index < seccion1.length; index++) {
      const pregunta = seccion1[index].pregunta;
      const respuestas_1 = seccion1[index].respuestas['1'];
      const respuestas_0 = seccion1[index].respuestas['0'];
      this.bodySeccion1.push([pregunta, respuestas_1, respuestas_0]);
    }
    for (let index = 0; index < seccion2.length; index++) {
      const pregunta = seccion2[index].pregunta;
      const respuestas_1 = seccion2[index].respuestas['1'];
      const respuestas_0 = seccion2[index].respuestas['0'];
      this.bodySeccion2.push([pregunta, respuestas_1, respuestas_0]);
    }
    for (let index = 0; index < seccion3.length; index++) {
      const pregunta = seccion3[index].pregunta;
      const respuestas_1 = seccion3[index].respuestas['1'];
      const respuestas_0 = seccion3[index].respuestas['0'];
      this.bodySeccion3.push([pregunta, respuestas_1, respuestas_0]);
    }
    for (let index = 0; index < seccion4.length; index++) {
      const pregunta = seccion4[index].pregunta;
      const respuestas_1 = seccion4[index].respuestas['1'];
      const respuestas_0 = seccion4[index].respuestas['0'];
      this.bodySeccion4.push([pregunta, respuestas_1, respuestas_0]);
    }
    //Creación del body de Observaciones y acuerdos del formulario
    for (let index = 0; index < answer_seccion1.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion1[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion1[index].observaciones;
        const observacionesDelMedico = answer_seccion1[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion1[index].fechaDeCumplimiento;
        this.answerBodySeccion1.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
    for (let index = 0; index < answer_seccion2.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion2[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion2[index].observaciones;
        const observacionesDelMedico = answer_seccion2[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion2[index].fechaDeCumplimiento;
        this.answerBodySeccion2.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
    for (let index = 0; index < answer_seccion3.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion3[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion3[index].observaciones;
        const observacionesDelMedico = answer_seccion3[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion3[index].fechaDeCumplimiento;
        this.answerBodySeccion3.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
    for (let index = 0; index < answer_seccion4.length; index++) {
      const numeroPregunta = index + 1;
      const respuesta = answer_seccion4[index].respuesta;
      if (respuesta == '0') {
        const observaciones = answer_seccion4[index].observaciones;
        const observacionesDelMedico = answer_seccion4[index].observacionesDelMedico;
        const fechaDeCumplimiento = answer_seccion4[index].fechaDeCumplimiento;
        this.answerBodySeccion4.push([numeroPregunta, respuesta, observaciones, observacionesDelMedico, fechaDeCumplimiento]);
      }
    }
  }
}