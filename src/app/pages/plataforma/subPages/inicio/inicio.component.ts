import { Component, OnInit } from '@angular/core';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import * as XLSX from 'xlsx';
//Importamos Chartjs
import Chart from 'chart.js/auto';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  //Total de corrales para cada tipo
  total_corrales_cacn: number = 0;
  total_corrales_ce:number = 0;
  total_corrales_cea: number = 0;
  //Mostrar lista de corrales
  show_corrales_list = false;
  //Nombre de lista de tipo de corral seleccionado
  selected_corral_type_name: string = '';
  //Lista del directorio de corrales por tipo
  lista_corrales_mostrada = [];
  lista_corrales_cacn = [];
  lista_corrales_ce = [];
  lista_corrales_cea = [];
  // Variable para la fecha y hora
  actualizationHour = new Date().toISOString();
  // Variables para los números de formularios
  cacn_number = 0;
  ce_number = 0;
  cea_number = 0;
  total_number_of_forms = 0;
  //Variable para indicar loading
  isLoading = true;
  isLoadingGraphdata = false;
  //Variable para controlar cuando se muestra la tabla de incumplimiento detallado
  show_incumplimiento_detallado_table = false;
  //Variables para la gráfica de tendencias
  graphInfo = this.fb.group({
    tipo_de_corral: null,
    nombre_de_corral: null
  });
  //Formulario de la sección de descargar excel por año
  download_excel_form = this.fb.group({
    year: null
  });
  //Formulario de la sección de "Información General"
  general_info_form = this.fb.group({
    tipo_de_corral: null,
    year: null
  });
  //Formulario de la sección de "Información Detallada"
  detailed_info_form = this.fb.group({
    tipo_de_corral: null,
    nombre_de_corral: null,
    year: null,
  });
  //Formulario para la tabla de incumplimiento detallado
  incumplimientos_month_form = this.fb.group({
    month: null,
  });
  //Variable para mostrar el mensaje de no hay datos
  no_records = true;
  nombres_de_corrales = [];
  nombres_de_corrales_detailed_info = [];
  //Variables para enlistar los datos devueltos por la búsqueda de incumplimientos por corral
  incumplimientos_detailed_info = [];
  //Esta es la vaeriable para incumplimientos anuales detallados
  incumplimientos_anuales_detailed_info = [];
  //Arreglo de colores para la gráfica
  colores_de_porcentajes: string[] = [];
  chartJsonData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: 'Calificación (%)',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: this.colores_de_porcentajes,
      borderColor: this.colores_de_porcentajes
    }]
  };
  //Data de la gráfica de incumplimiento
  incumplimientoChartJsonData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'CACN(%)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(193,66,66, 0.8)',
        backgroundColor: 'rgba(193,66,66, 0.8)',
      },
      {
        label: 'CE(%)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(70,191,63, 0.8)',
        backgroundColor: 'rgba(70,191,63, 0.8)',
      },
      {
        label: 'CEA(%)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(255, 99, 32, 0.8)',
        backgroundColor: 'rgba(255, 99, 32, 0.8)',
      }
    ]
  }
  //Data de la gráfica de incumplimiento general
  incumplimientoChartJsonDataGeneral = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: '- (%)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(193,66,66, 0.8)',
        backgroundColor: 'rgba(193,66,66, 0.8)',
      },
    ]
  }
  //Data de la gráfica de incumplimiento detallada
  incumplimientoChartJsonDataDetallado = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: '- (%)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(193,66,66, 0.8)',
        backgroundColor: 'rgba(193,66,66, 0.8)',
      },
    ]
  }
  //Data de la gráfica de frecuencias de incumplimiento detallado
  frecuenciaIncumplimientosChartJsonDataDetallado = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: '- (%)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(193,66,66, 0.8)',
        backgroundColor: 'rgba(193,66,66, 0.8)',
      },
    ]
  }
  //Data de la gráfica de cumplimiento detallada
  calificacionChartJsonDataGeneral = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: 'Calificación (%)',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: this.colores_de_porcentajes,
      borderColor: this.colores_de_porcentajes
    }]
  }
  //Data de la gráfica de cumplimiento detallada
  cumplimientoChartJsonDataDetallado = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [{
      label: 'Calificación (%)',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: this.colores_de_porcentajes,
      borderColor: this.colores_de_porcentajes
    }]
  }
  //Los ids de los canvas de ChartJS
  myChart: any;
  myChart2: any;
  chart_calificacion_general: any;
  chart_calificacion_detallado: any;
  chart_incumplimiento_general: any;
  chart_inventario_detallado: any;
  chart_frecuencias_incumplimiento_detallado: any;

  constructor(private _mongodb: MongodbService, private fb: FormBuilder) {
    this.getTotalCorralesPorTipo();
    this.getNumberOfForms();
  }

  ngOnInit(): void {
    /*
    //Iniciamos cargando la gráfica de porcentajes de cumplimiento
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: this.chartJsonData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
    //Iniciamos cargando la gráfica de porcentajes de incumplimiento
    this.myChart2 = new Chart('myChart2', {
      type: 'line',
      data: this.incumplimientoChartJsonData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Porcentaje de incumplimientos 2'
          }
        }
      }
    });
    */
    //Iniciamos cargando la gráfica de porcentajes de cumplimiento general
    this.chart_calificacion_general = new Chart('chart_calificacion_general', {
      type: 'bar',
      data: this.calificacionChartJsonDataGeneral,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Calificación obtenida'
          }
        }
      }
    });
    //Iniciamos cargando la gráfica de porcentajes de cumplimiento detallado
    this.chart_calificacion_detallado = new Chart('chart_calificacion_detallado', {
      type: 'bar',
      data: this.cumplimientoChartJsonDataDetallado,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Calificación obtenida'
          }
        }
      }
    });
    //Iniciamos cargando la gráfica de porcentajes de incumplimiento general
    this.chart_incumplimiento_general = new Chart('chart_incumplimiento_general', {
      type: 'line',
      data: this.incumplimientoChartJsonDataGeneral,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Porcentaje de incumplimientos'
          }
        }
      }
    });
    //Iniciamos cargando la gráfica de porcentajes de incumplimiento detallado
    this.chart_inventario_detallado = new Chart('chart_inventario_detallado', {
      type: 'line',
      data: this.incumplimientoChartJsonDataDetallado,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Inventario'
          }
        }
      }
    });
    //Iniciamos cargando la gráfica de frecuencias de incumplimiento detallado
    this.chart_frecuencias_incumplimiento_detallado = new Chart('chart_frecuencias_incumplimiento_detallado', {
      type: 'line',
      data: this.frecuenciaIncumplimientosChartJsonDataDetallado,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Porcentaje de incumplimientos más frecuentes'
          }
        }
      }
    });
    //Cargamos los datos de la gráfica de porcentajes de incumplimiento
    //this.generateGraphIncumplimientos();
  }

  // Función para obtener la cantidad de formularios almacenados hasta el momento
  async getNumberOfForms() {
    let result: any = await this._mongodb.getFormsByYear('2022');
    this.isLoading = false;
    this.cacn_number = result.forms_historical.cacn_forms;
    this.ce_number = result.forms_historical.ce_forms;
    this.cea_number = result.forms_historical.cea_forms;
    this.total_number_of_forms = this.cacn_number + this.ce_number + this.cea_number;
  }

  //Función para obtener el total de corrales en el directorio por tipo
  async getTotalCorralesPorTipo() {
    let result = await this._mongodb.getTotalCorralesPorTipo();
    this.total_corrales_cacn = result.cantidad_corrales_cacn;
    this.total_corrales_ce = result.cantidad_corrales_ce;
    this.total_corrales_cea = result.cantidad_corrales_cea;
    this.lista_corrales_cacn = result.corrales_cacn;
    this.lista_corrales_ce = result.corrales_ce;
    this.lista_corrales_cea = result.corrales_cea;
  }
  //Función para generar excel de tendecias en zona SUR
  async generateExcelTendencias() {
    let year = this.download_excel_form.value.year;
    let excelData = await this._mongodb.getInfoExcelTendencias(year);
    let ws_data_cacn = excelData.ws_data_cacn;
    let ws_data_ce = excelData.ws_data_ce;
    let ws_data_cea = excelData.ws_data_cea;
    /* create a new blank workbook */
    var wb = XLSX.utils.book_new();
    /* make worksheets */
    var ws_cacn = XLSX.utils.aoa_to_sheet(ws_data_cacn);
    var ws_ce = XLSX.utils.aoa_to_sheet(ws_data_ce);
    var ws_cea = XLSX.utils.aoa_to_sheet(ws_data_cea);
    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(wb, ws_cacn, 'CACN');
    XLSX.utils.book_append_sheet(wb, ws_ce, 'CE');
    XLSX.utils.book_append_sheet(wb, ws_cea, 'CEA');
    XLSX.writeFile(wb, 'TENDENCIAS.xlsx');
  }

  //Función para obtener los nombres de los corrales por tipo de corral
  async filterByCorralTypeDetailedInfo() {
    this.isLoadingGraphdata = true;
    this.nombres_de_corrales_detailed_info = [];
    let corralNames: any = await this._mongodb.getCorralNamesByCorralType(this.detailed_info_form.value.tipo_de_corral);
    this.nombres_de_corrales_detailed_info = corralNames.corrales;
    this.isLoadingGraphdata = false;
  }

  //Función para actualizar gráfica de tendencias
  async generateGraph() {
    this.isLoadingGraphdata = true;
    //Obtenemos los valores a consultar
    let corralName = this.graphInfo.value.nombre_de_corral;
    let corralType = this.graphInfo.value.tipo_de_corral;
    this.colores_de_porcentajes = [];
    let result = await this._mongodb.getInfoGraphTendencias(corralType, corralName);
    this.isLoadingGraphdata = false;
    let iterator = result.data;
    //A partir de aqui debo agarrar los datos de la gráfica
    let data = [iterator[1] == '-' ? 0 : parseFloat(iterator[1].split('%')[0]), iterator[2] == '-' ? 0 : parseFloat(iterator[2].split('%')[0]), iterator[3] == '-' ? 0 : parseFloat(iterator[3].split('%')[0]), iterator[4] == '-' ? 0 : parseFloat(iterator[4].split('%')[0]), iterator[5] == '-' ? 0 : parseFloat(iterator[5].split('%')[0]), iterator[6] == '-' ? 0 : parseFloat(iterator[6].split('%')[0]), iterator[7] == '-' ? 0 : parseFloat(iterator[7].split('%')[0]), iterator[8] == '-' ? 0 : parseFloat(iterator[8].split('%')[0]), iterator[9] == '-' ? 0 : parseFloat(iterator[9].split('%')[0]), iterator[10] == '-' ? 0 : parseFloat(iterator[10].split('%')[0]), iterator[11] == '-' ? 0 : parseFloat(iterator[11].split('%')[0]), iterator[12] == '-' ? 0 : parseFloat(iterator[12].split('%')[0])];
    //Definimos los colores de acuerdo al porcentaje
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element >= 0 && element <= 59) {
        this.colores_de_porcentajes.push('rgba(255, 66, 71, 1)');
      }
      if (element > 59 && element <= 74) {
        this.colores_de_porcentajes.push('rgba(255, 131, 71,1)');
      }
      if (element > 74 && element <= 99) {
        this.colores_de_porcentajes.push('rgba(255, 203, 71,1)');
      }
      if (element > 99 && element <= 100) {
        this.colores_de_porcentajes.push('rgba(60, 179, 113, 1)');
      }
    }
    this.chartJsonData.datasets[0].data = data;
    this.chartJsonData.datasets[0].backgroundColor = this.colores_de_porcentajes;
    this.chartJsonData.datasets[0].borderColor = this.colores_de_porcentajes;
    this.myChart.update();
  }

  //Función para generar las gráficas generales 
  async generateGeneralGraphs() {
    await this.generateGraphCalificacionGeneral();
    await this.generateGraphIncumplimientosGeneral();
  }

  //Función para generar la gráfica de Calificación General
  async generateGraphCalificacionGeneral() {
    this.isLoadingGraphdata = true;
    //Obtenemos los valores a consultar
    let tipo_de_corral = this.general_info_form.value.tipo_de_corral;
    let year = this.general_info_form.value.year;
    this.colores_de_porcentajes = [];
    let result = await this._mongodb.getInfoGraphCalificacionesGeneral(tipo_de_corral, year);
    this.isLoadingGraphdata = false;
    let iterator = result;
    //A partir de aqui debo agarrar los datos de la gráfica
    let data = [iterator[1] == '-' ? 0 : parseFloat(iterator[1].split('%')[0]), iterator[2] == '-' ? 0 : parseFloat(iterator[2].split('%')[0]), iterator[3] == '-' ? 0 : parseFloat(iterator[3].split('%')[0]), iterator[4] == '-' ? 0 : parseFloat(iterator[4].split('%')[0]), iterator[5] == '-' ? 0 : parseFloat(iterator[5].split('%')[0]), iterator[6] == '-' ? 0 : parseFloat(iterator[6].split('%')[0]), iterator[7] == '-' ? 0 : parseFloat(iterator[7].split('%')[0]), iterator[8] == '-' ? 0 : parseFloat(iterator[8].split('%')[0]), iterator[9] == '-' ? 0 : parseFloat(iterator[9].split('%')[0]), iterator[10] == '-' ? 0 : parseFloat(iterator[10].split('%')[0]), iterator[11] == '-' ? 0 : parseFloat(iterator[11].split('%')[0]), iterator[12] == '-' ? 0 : parseFloat(iterator[12].split('%')[0])];
    //Definimos los colores de acuerdo al porcentaje
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element >= 0 && element <= 59) {
        this.colores_de_porcentajes.push('rgba(255, 66, 71, 1)');
      }
      if (element > 59 && element <= 74) {
        this.colores_de_porcentajes.push('rgba(255, 131, 71,1)');
      }
      if (element > 74 && element <= 99) {
        this.colores_de_porcentajes.push('rgba(255, 203, 71,1)');
      }
      if (element > 99 && element <= 100) {
        this.colores_de_porcentajes.push('rgba(60, 179, 113, 1)');
      }
    }
    this.calificacionChartJsonDataGeneral.datasets[0].data = data;
    this.calificacionChartJsonDataGeneral.datasets[0].backgroundColor = this.colores_de_porcentajes;
    this.calificacionChartJsonDataGeneral.datasets[0].borderColor = this.colores_de_porcentajes;
    this.chart_calificacion_general.update();
  }
  //Función para generar gráfica de porcentaje de incumplimientos
  async generateGraphIncumplimientos() {
    let percents = await this._mongodb.getInfoGraphPorcentajeIncumplimiento();
    let cacn = percents.cacn;
    let ce = percents.ce;
    let cea = percents.cea;
    this.incumplimientoChartJsonData.datasets[0].data = cacn;
    this.incumplimientoChartJsonData.datasets[1].data = ce;
    this.incumplimientoChartJsonData.datasets[2].data = cea;
    this.myChart2.update();
  }

  //Función para buscar información de incumplimientos por corral
  async getIncumplimientosByCorralDetailedInfo() {
    this.isLoadingGraphdata = true;
    this.incumplimientos_detailed_info = [];
    var year_month_string = `${this.detailed_info_form.value.year}-${this.incumplimientos_month_form.value.month}`;
    switch (this.detailed_info_form.value.tipo_de_corral) {
      case 'CACN':
        this.incumplimientos_detailed_info = await this._mongodb.getIncumplimientosDetailedCACN(this.detailed_info_form.value.nombre_de_corral, year_month_string);
        break;
      case 'CE':
        this.incumplimientos_detailed_info = await this._mongodb.getIncumplimientosDetailedCE(this.detailed_info_form.value.nombre_de_corral, year_month_string);
        break;
      case 'CEA':
        this.incumplimientos_detailed_info = await this._mongodb.getIncumplimientosDetailedCEA(this.detailed_info_form.value.nombre_de_corral, year_month_string);
        break;
      default:
        break;
    }
    if (this.incumplimientos_detailed_info.length == 0) {
      this.no_records = true;
    }
    else {
      this.no_records = false;
    }
  }

  //Función para generar las gráficas de calificación e incumplimiento detallado
  async generateDetailedInfoGraphs() {
    //Limpiamos la gráfica de incumplimientos detallado
    this.clearGraphIncumplimientosDetallado();
    //Limpiamos la gráfica de calificación detallado
    this.clearGraphCalificacionesDetallado();
    //Generamos las gráficas de calificación e incumplimiento detallado
    await this.generateGraphCalificacionesDetallado();
    await this.generateGraphIncumplimientosDetallado();
    //Generamos la gráfica de incumplimientos con más repeticiones(FALTA HACER)
    await this.generateGraphAndTableIncumplimientosMasRepeticiones();
  }

  //Función para cargar los datos de la gráfica de calificación detallado
  async generateGraphCalificacionesDetallado() {
    //Consultamos la data para la gráfica de calificaciones detallado
    let data_calificacion_detallado = await this._mongodb.getInfoGraphCalificacionDetallado(this.detailed_info_form.value.tipo_de_corral, this.detailed_info_form.value.nombre_de_corral, this.detailed_info_form.value.year);
    let colores_de_porcentajes = [];
    //Definimos los colores de acuerdo al porcentaje
    for (let index = 0; index < data_calificacion_detallado.length; index++) {
      const element = data_calificacion_detallado[index];
      if (element >= 0 && element <= 59) {
        colores_de_porcentajes.push('rgba(255, 66, 71, 1)');
      }
      if (element > 59 && element <= 74) {
        colores_de_porcentajes.push('rgba(255, 131, 71,1)');
      }
      if (element > 74 && element <= 99) {
        colores_de_porcentajes.push('rgba(255, 203, 71,1)');
      }
      if (element > 99 && element <= 100) {
        colores_de_porcentajes.push('rgba(60, 179, 113, 1)');
      }
    }
    this.cumplimientoChartJsonDataDetallado.datasets[0].data = data_calificacion_detallado;
    this.cumplimientoChartJsonDataDetallado.datasets[0].backgroundColor = colores_de_porcentajes;
    this.cumplimientoChartJsonDataDetallado.datasets[0].borderColor = colores_de_porcentajes;
    this.chart_calificacion_detallado.update();
  }

  //Función para cargar los datos de la gráfica de Incumplimientos General
  async generateGraphIncumplimientosGeneral() {
    var tipo_de_corral = this.general_info_form.value.tipo_de_corral;
    var year = this.general_info_form.value.year;
    //Consultamos la data para la gráfica de incumplimientos detallado
    var data_incumplimientos_general = await this._mongodb.getInfoGraphIncumplimientosGeneral(tipo_de_corral, year);
    this.incumplimientoChartJsonDataGeneral.datasets[0].data = data_incumplimientos_general;
    //Actualizamos el gráfico
    this.isLoadingGraphdata = false;
    this.incumplimientoChartJsonDataGeneral.datasets[0].label = `${tipo_de_corral} (%)`;
    this.chart_incumplimiento_general.update();
  }

  //Función para cargar los datos de la gráfica de incumplimientos detallado
  async generateGraphIncumplimientosDetallado() {
    //Consultamos la data para la gráfica de incumplimientos detallado
    var data_incumplimientos_detallado = await this._mongodb.getNumCabezasPorTipoCorral(this.detailed_info_form.value.tipo_de_corral, this.detailed_info_form.value.nombre_de_corral, this.detailed_info_form.value.year);
    this.incumplimientoChartJsonDataDetallado.datasets[0].data = data_incumplimientos_detallado;
    //Actualizamos el gráfico
    this.isLoadingGraphdata = false;
    this.incumplimientoChartJsonDataDetallado.datasets[0].label = `${this.detailed_info_form.value.tipo_de_corral}`;
    this.chart_inventario_detallado.update();
  }

  //Función para limpiarla gráfica de calificación detallada
  clearGraphCalificacionesDetallado() {
    this.cumplimientoChartJsonDataDetallado.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.chart_calificacion_detallado.update();
  }

  //Función para limpiar la gráfica de Incumplimientos detallado
  clearGraphIncumplimientosDetallado() {
    this.incumplimientoChartJsonDataDetallado.datasets[0].label = '- (%)';
    this.incumplimientoChartJsonDataDetallado.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.chart_inventario_detallado.update();
  }

  //Función para cargar los datos de la gráfica de incumplimientos con más repeticiones (FALTA HACER)
  async generateGraphAndTableIncumplimientosMasRepeticiones() {
    this.incumplimientos_anuales_detailed_info = [];
    let months_array = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    //Consultamos la data para la tabla de incumplimientos con más repeticiones
    switch (this.detailed_info_form.value.tipo_de_corral) {
      case 'CACN':
        this.incumplimientos_anuales_detailed_info = await this._mongodb.getIncumplimientosDetailedCACN(this.detailed_info_form.value.nombre_de_corral, this.detailed_info_form.value.year);
        break;
      case 'CE':
        this.incumplimientos_anuales_detailed_info = await this._mongodb.getIncumplimientosDetailedCE(this.detailed_info_form.value.nombre_de_corral, this.detailed_info_form.value.year);
        break;
      case 'CEA':
        this.incumplimientos_anuales_detailed_info = await this._mongodb.getIncumplimientosDetailedCEA(this.detailed_info_form.value.nombre_de_corral, this.detailed_info_form.value.year);
        break;
      default:
        break;
    }
  }

  //Función para mostrar la lista de corrales
  showCorralesList(corral_type:string) {
    this.show_corrales_list = true;
    switch (corral_type) {
      case 'CACN':
        this.selected_corral_type_name = 'CACN';
        this.lista_corrales_mostrada = this.lista_corrales_cacn;
        break;
      case 'CE':
        this.selected_corral_type_name = 'CE';
        this.lista_corrales_mostrada = this.lista_corrales_ce;
        break;
      case 'CEA':
        this.selected_corral_type_name = 'CEA';
        this.lista_corrales_mostrada = this.lista_corrales_cea;
        break;
      default:
        break;
    }
  }

  //Función para ocultar la lista de corrales
  hideCorralesList(){
    this.show_corrales_list = false;
  }
}
