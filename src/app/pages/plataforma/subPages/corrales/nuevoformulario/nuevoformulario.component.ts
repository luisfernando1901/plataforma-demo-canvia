import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MongodbService } from 'src/app/services/mongodb/mongodb.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-nuevoformulario',
  templateUrl: './nuevoformulario.component.html',
  styleUrls: ['./nuevoformulario.component.css']
})
export class NuevoformularioComponent implements OnInit {
  //Variables que son de prueba nomas
  formularioCACN = {
    "seccion1":
    {
      "titulo": "PRIMERA SECCION - INSTALACIONES",
      "questionario": [
        {
          "pregunta": "1.- Un corral de Acopio de Consumo Nacional deberá consistir de todo el CACN, no están permitidas otras PSG o UPP dentro del mismo predio.",
          "respuestas": {
            "1": ["Opera con su PSG"],
            "0": ["Hay otra PSG en el CACN", "Hay una UPP en el CACN"]
          }
        },
        {
          "pregunta": "2.- El CACN está a autorizado por SAYG / DISI, que dictamina el cumplimiento de todos los requisitos mínimos acordados para tal figura.",
          "respuestas": {
            "1": ["Cuenta con autorización de DISI"],
            "0": ["No Cuenta con autorización de DISI", "Cuenta con autorización DISI, pero no la muestra"]
          }
        },
        {
          "pregunta": "3.- El Estado designa PERSONAL TECNICO para coordinar la vigilancia y supervisión de cada CACN entre el Gobierno Estatal y CEFPPSIN.",
          "respuestas": {
            "1": ["Asistió personal oficial SAyG y CEFPPSIN"],
            "0": ["No asistió personal oficial SAyG y CEFPPSIN"]
          }
        },
        {
          "pregunta": "4.- El Encargado del CACN es el responsable que el ingreso y egreso de ganado cumpla con todos los requisitos de trazabilidad.",
          "respuestas": {
            "1": ["El encargado garantiza el cumplimiento de los requisitos de trazabilidad"],
            "0": ["El encargado no garantiza el cumplimiento de los requisitos de trazabilidad"]
          }
        },
        {
          "pregunta": "5.- La Cerca perimetral deben ser adecuada para prevenir la entrada o salida de los animales de las instalaciones. Si existen propiedades adyacentes en donde haya ganado, deberá haber doble cerca para prevenir el contacto entre animales.",
          "respuestas": {
            "1": ["Cerca perimetral completa y en buen estado"],
            "0": ["No tiene cerca perimetral", "Cerca perimetral en mal estado al sur del CE", "Cerca perimetral en mal estado al norte del CE", "Cerca perimetral en mal estado al este del CE", "Cerca perimetral al oeste del CE", "Falta tramo de la cerca al sur del CE", "Falta tramo de cerca perimetral al norte del CE", "Falta tramo de cerca perimetral al este del CE", "Falta tramo de cerca perimetral al oeste del CE"]
          }
        },
        {
          "pregunta": "6.-Todos los CACN deberán mantener a los animales en confinamiento en condiciones secas (no se permite el pastoreo).",
          "respuestas": {
            "1": ["Ganado en confinamiento"],
            "0": ["Ganado en pastoreo"]
          }
        },
        {
          "pregunta": "7.- Las instalaciones y todo el equipo deben ser adecuadas para manejar a los animales de forma segura y efectiva como sea necesario.",
          "respuestas": {
            "1": ["Corrales, trampa, bascula, y shute adecuados y seguros"],
            "0": ["No cuenta con corrales, trampa, bascula, y shute adecuados y seguros"]
          }
        },
        {
          "pregunta": "8.- Los predios que rodean a los corrales deberán ser revisados para checar la presencia o ausencia de ganado. Los predios adyacentes que tengan ganado deberán probarse los animales anualmente.",
          "respuestas": {
            "1": ["No hay hatos adyacentes", "Hay un hato adyacente con prueba vigente de 1 año"],
            "0": ["Hay un hato adyacente sin dictámenes de prueba de TB y BR", "Hay un hato adyacente con dictámenes de prueba de TB y BR vencidos"]
          }
        },
        {
          "pregunta": "9.- Cuenta con infraestructura adecuada para monitorear la movilización de ganado en tiempo y forma (entradas y salidas de ganado en bitácoras físicas-electrónicas).",
          "respuestas": {
            "1": ["Bitácora física", "Bitácora electrónica"],
            "0": ["No tiene bitácora", "La bitácora no está actualizada"]
          }
        },
        {
          "pregunta": "10.- El CACN permite la inspección de sus instalaciones y archivos documentales de ingreso y egreso de ganado cuando se les solicite, durante horarios de trabajo.",
          "respuestas": {
            "1": ["Permite la supervisión"],
            "0": ["No permite la supervisión"]
          }
        }
      ]
    },
    "seccion2":
    {
      "titulo": "SEGUNDA SECCION - ENTRADA DE GANADO AL CORRAL DE ENGORDA",
      "questionario": [
        {
          "pregunta": "1.- En un CACN solo se permite animales del Estado de Sinaloa.",
          "respuestas": {
            "1": ["El CACN solo aloja ganado del Sinaloa"],
            "0": ["El CACN solo aloja ganado del Sinaloa"]
          }
        },
        {
          "pregunta": "2.- Se documenta el ingreso y egreso del ganado a las instalaciones.  Los archivos de orígenes de todos los lotes de animales deberán ser estrictamente controlados. (BITACORA DE INGRESOS)",
          "respuestas": {
            "1": ["Bitácora física actualizada", "Bitácora electrónica actualizada"],
            "0": ["No tiene bitácora", "La bitácora no está actualizada"]
          }
        },
        {
          "pregunta": "3.- Todos los animales deberán portar desde origen arete de identificación oficial (SINIIGA) y marca CN. Cada arete y marca de fuego deberá ser verificada y registrar cada entrada al CACN.",
          "respuestas": {
            "1": ["Todo el ganado porta aretes SINIIGA y marca CN"],
            "0": ["Hay ganado sin ambos aretes SINIIGA", "Hay ganado sin arete SINIIGA tipo bandera", "Hay ganado sin arete SINIIGA tipo botón", "Una parte del ganado no porta la marca CN", "El total del ganado no porta la marca CN"]
          }
        },
        {
          "pregunta": "4.- Todos los vehículos que movilicen ganado al corral, deberán estar flejados y Guía de Transito REEMO.",
          "respuestas": {
            "1": ["El ganado cuenta con Guía REEMO y fleje"],
            "0": ["Moviliza ganado sin Guía REEMO", "No se anexó al expediente la Guía REEMO", "Moviliza ganado sin fleje", "No anexó al expediente el fleje"]
          }
        }
      ]
    },
    "seccion3":
    {
      "titulo": "TERCERA SECCION - SALIDA DEL GANADO DEL CORRAL DE ENGORDA",
      "questionario": [
        {
          "pregunta": "1.- Para ser considerado un CACN, todos los animales del corral deberán ir directamente a un CE o CEA   con vehículo flejado, Guía REEMO.",
          "respuestas": {
            "1": ["El CACN solo aloja ganado del Sinaloa"],
            "0": ["El CACN solo aloja ganado del Sinaloa"]
          }
        },
        {
          "pregunta": "2.- Todos los animales que salgan del CACN al RASTRO TIF deben llevar Guía de Transito REEMO, fleje y Certificado Zoosanitario, si se envían al RASTRO municipal deben llevar Guía de Transito REEMO y fleje.",
          "respuestas": {
            "1": ["El ganado  a rastro TIF cuenta con Guía REEMO, fleje y CZMN", "El ganado a rastro municipal cuenta con Guía REEMO y fleje"],
            "0": ["Moviliza ganado a rastro sin Guía REEMO", "No se anexó al expediente la Guía REEMO", "Moviliza ganado a rastro sin fleje", "Moviliza ganado a rastro TIF sin CZMN", "No se anexó al expediente el CZMN"]
          }
        },
        {
          "pregunta": "3.- Los animales que salen del CACN para sacrificio, CE O CEA deben estar identificados individualmente y registrar su número (SINIIGA) de identificación. (BITACORA DE EGRESOS)",
          "respuestas": {
            "1": ["El ganado enviado a rastro está identificado y registrado en bitácora"],
            "0": ["Envía ganado a rastro sin identificador SINIIGA", "No registra en bitácora el ganado enviado a rastro"]
          }
        }
      ]
    },
    "seccion4":
    {
      "titulo": "CUARTA SECCION - OTROS",
      "questionario": [
        {
          "pregunta": "1.- Cualquier animal que nazca en el CACN deberá ser documentado en bitácora correspondiente, marcado a fuego con CN, identificado con arete y permanecer ahí hasta su sacrificio o envió a un CEA.",
          "respuestas": {
            "1": ["No hay nacimientos", "Las crías están registradas y correlacionadas con la madre y tienen arete SINIIGA"],
            "0": ["No lleva bitácora de los nacimientos", "hay crías correlacionadas con las madre sin registrar", "Hay crías sin registrar, sin correlacionar con la madre", "Hay crías registradas y correlacionadas con la madre, que no tienen arete SINIIGA"]
          }
        },
        {
          "pregunta": "2.- Los CACN deberán mantener bitácora de todos los animales que mueran y de todos los animales que necesiten ser sacrificados humanitariamente.",
          "respuestas": {
            "1": ["El registro de los muertos en corral está actualizado"],
            "0": ["No lleva bitácora de muertos", "La bitácora de muertos no está actualizada"]
          }
        },
        {
          "pregunta": "3.- La falta al cumplimiento de cualquiera de estos requerimientos está sujeta a una sanción o cancelación de la aprobación del CE.",
          "respuestas": {
            "1": ["El CACN acepta el compromiso de solventar las observaciones derivadas de la supervisión o recibir una sanción"],
            "0": []
          }
        }
      ]
    }
  }
  formularioCE = {
    "seccion1":
    {
      "titulo": "PRIMERA SECCION - INSTALACIONES DEL CE",
      "questionario": [
        {
          "pregunta": "1.	Un corral de engorda consistirá del corral de engorda completo. No están permitidas otras PSG o UPP dentro del mismo predio.",
          "respuestas": {
            "1": ["Opera con su PSG"],
            "0": ["Hay otra PSG en el CE", "Hay una UPP en el CE"]
          }
        },
        {
          "pregunta": "2.	Cada corral de engorda debe estar autorizado por SAyG de gobierno del Estado quien verifica que se haya cumplido con todos los requisitos mínimos.",
          "respuestas": {
            "1": ["Aprobación vigente"],
            "0": ["Aprobación vencida"]
          }
        },
        {
          "pregunta": "3.	El Estado designará a un veterinario para coordinar la vigilancia y supervisión de cada corral de engorda aprobados entre el gobierno del estado y SADER.",
          "respuestas": {
            "1": ["Asistió personal oficial SAyG"],
            "0": ["No asistió personal oficial SAyG"]
          }
        },
        {
          "pregunta": "4.	Un médico del comité deberá inspeccionar y revisar los registros de los corrales de engorda y verificará por los menos cada 30 días, que el corral de engorda cumple con todos los requisitos.",
          "respuestas": {
            "1": ["Asistió personal oficial CEFPPSIN"],
            "0": ["No asistió personal oficial CEFPPSIN"]
          }
        },
        {
          "pregunta": "5.	Deberán colocarse cercas perimetrales adecuadas para prevenir que los animales entren o salgan de las instalaciones. Si las propiedades adyacentes se usan para el ganado bovino, debe colocarse una cerca doble para prevenir el contacto nariz con nariz.",
          "respuestas": {
            "1": ["Cerca perimetral completa y en buen estado"],
            "0": ["No tiene cerca perimetral", "Cerca perimetral en mal estado al sur del CE", "Cerca perimetral en mal estado al norte del CE", "Cerca perimetral en mal estado al este del CE", "Cerca perimetral al oeste del CE", "Falta tramo de la cerca al sur del CE", "Falta tramo de cerca perimetral al norte del CE", "Falta tramo de cerca perimetral al este del CE", "Falta tramo de cerca perimetral al oeste del CE"]
          }
        },
        {
          "pregunta": "6.	Las instalaciones y todo el equipo deben ser adecuados para el manejo de animales de forma segura y eficaz, según sea necesario.",
          "respuestas": {
            "1": ["Corrales, trampa, báscula, y shute adecuados y seguros"],
            "0": ["Corrales, trampa, báscula y shute inadecuados e inseguros"]
          }
        },
        {
          "pregunta": "7.	Los predios colindantes a los corrales de engorda serán revisados para checar si existe la presencia de ganado bovino. Los predios adyacentes a los corrales de engorda en donde exista la presencia de ganado bovino deberán probar a sus animales de forma anual.",
          "respuestas": {
            "1": ["No hay hatos adyacentes", "Hay un hato adyacente con prueba vigente de 1 año"],
            "0": ["Hay un hato adyacente sin dictámenes de prueba de TB y BR", "Hay un hato adyacente con dictámenes de prueba de TB y BR vencidos"]
          }
        },
        {
          "pregunta": "8.	El corral de engorda mantendrá un registro actualizado de su clave PSG, la ubicación y del número de corrales, así como los como de los planos arquitectónicos de las instalaciones. Estos documentos deberán estar disponibles para cuando los inspectores lo soliciten.",
          "respuestas": {
            "1": ["Tiene actualizados sus documentos normativos y los muestra a la visita"],
            "0": ["PSG vigencia de 1 año, vencida ", "No tiene actualizada la Autorización de DISI"]
          }
        },
        {
          "pregunta": "9.	La infraestructura debe ser adecuada con el fin de poder monitorear las movilizaciones de los animales.",
          "respuestas": {
            "1": ["Bitácora física", "Bitácora electrónica"],
            "0": ["No tiene bitácora", "La bitácora no está actualizada"]
          }
        },
        {
          "pregunta": "10.	Todos los corrales de engorda deben permitir las inspecciones de las instalaciones y de sus registros cuando se les solicite, durante horas regulares de trabajo.",
          "respuestas": {
            "1": ["Permite la supervisión"],
            "0": ["No permite la supervisión"]
          }
        }
      ]
    },
    "seccion2":
    {
      "titulo": "SEGUNDA SECCION - ENTRADA DE GANADO A CE",
      "questionario": [
        {
          "pregunta": "1.	La procedencia de todo el ganado bovino que ingresa a las instalaciones debe documentarse, así como el destino de todo el ganado bovino que sale de las instalaciones. Debe registrarse la información del propietario, inventario y número de animales. Los libros de registros de las entradas y salidas del ganado bovino y los registros de la procedencia de todos los lotes de animales deben estar estrictamente controlados.",
          "respuestas": {
            "1": ["Bitácora física actualizada", "Bitácora electrónica actualizada"],
            "0": ["No tiene bitácora", "La bitácora no está actualizada"]
          }
        },
        {
          "pregunta": "2.	Los vehículos que movilicen animales hacia los corrales de engorda o hacia rastros deben estar flejados. Los números de los flejes se deben registrar, así como el nombre y puesto del personal que pone y quita los sellos en el corral de engorda, así como en el rastro.",
          "respuestas": {
            "1": ["Registra en bitácora los flejes y el responsable"],
            "0": ["No registra flejes", "No registra responsable de flejes", "No está actualizado el registro de flejes en bitácora"]
          }
        },
        {
          "pregunta": "3.	Cada lote de ganado que entre a un CE deberá tener permiso emitido por la SAYG/DISI. Esto incluye el ganado que se desplaza de un CE a otro CE.",
          "respuestas": {
            "1": ["El ganado cuenta con Guía REEMO y fleje"],
            "0": ["Moviliza ganado sin Guía REEMO ni fleje", "La Guía no se anexó al expediente físico"]
          }
        },
        {
          "pregunta": "",
          "respuestas": {
            "1": ["El ganado cuenta con Guía REEMO y fleje"],
            "0": ["Moviliza ganado sin Guía REEMO ni fleje"]
          }
        },
        {
          "pregunta": "5.	Todos los animales deberán llegar portando un arete de identificación oficial del estado de origen, una marca de herrar con las siglas CN (Consumo Nacional). Las identificaciones y marcas de herrar de cada animal deberán verificarse en el PVI de entrada y a su llegada al corral de engorda.",
          "respuestas": {
            "1": ["Todo el ganado porta aretes SINIIGA y marca CN"],
            "0": ["Hay ganado sin ambos aretes SINIIGA", "Hay ganado sin arete tipo bandera", "Hay ganado sin arete tipo botón", "Una parte del ganado no porta la marca CN", "El total del ganado no porta la marca CN"]
          }
        },
        {
          "pregunta": "6.	Todos los animales que ingresen en el corral de engorda deben tener pruebas negativas a tuberculosis, dentro de los 60 días previos a su entrada en las instalaciones y castrados (hembras y machos).",
          "respuestas": {
            "1": ["No aplica a ganado del Estado", "El ganado ingresado de otro Estado cuenta con dictámenes de prueba de TB y BR negativos y vigentes a 60 días y está castrado"],
            "0": ["Ingresó ganado de otro Estado sin dictámenes de prueba de TB y BR", "Sin castrar", "Ingresó ganado de otro Estado con dictámenes de prueba de TB y BR vencidos a 60 días"]
          }
        },
        {
          "pregunta": "7.	Cuando se desconozca si los animales estuvieron expuestos a o infectados con TB y que provengan de hatos ubicados en Estados o zonas no-acreditadas (NA) a TB, con estatus de TB preparatorio acreditado (AP), acreditado modificado (MA), o acreditado modificado avanzado (MAA) deben tener pruebas negativas ya sea de un Oficial Estatal o de un veterinario acreditado con una tasa de respuesta a la prueba de pliegue Caudal de ≥ 0.5%.",
          "respuestas": {
            "1": ["Cuentan con dictámenes de prueba de TB y BR negativos realizados por un MVZRA con tasa de respuesta la PPC ≥al 0.5%"],
            "0": ["No cuenta con dictámenes de TB y BR", "Cuentan con dictámenes de prueba de TB y BR negativos realizados por un MVZRA con tasa de respuesta la PPC < al 0.5%"]
          }
        },
        {
          "pregunta": "8.	Verificar que no existan animales en el corral de engorda provenientes de hatos bajo cuarentena o CEA.",
          "respuestas": {
            "1": ["No aloja animales de hatos cuarentenados"],
            "0": ["Aloja animales de hatos cuarentenados de TB", "Aloja animales de hatos cuarentenados de BR"]
          }
        },
        {
          "pregunta": "9.	Si se confirma la presencia de Mycobacterium bovis en rastro, todos los bovinos expuestos en el corral serán aislados de otros bovinos en el corral de engorda, hasta que sea sacrificado.",
          "respuestas": {
            "1": ["Todo el ganado del CE se envía a un rastro autorizado y no necesita ser aislado"],
            "0": []
          }
        }
      ]
    },
    "seccion3":
    {
      "titulo": "TERCERA SECCION - EGRESOS",
      "questionario": [
        {
          "pregunta": "1.	Todos los animales que salgan del CE al RASTRO TIF deben llevar Guía de Transito REEMO, fleje y Certificado Zoosanitario, si se envían al RASTRO municipal deben llevar Guía de Transito REEMO y fleje.",
          "respuestas": {
            "1": ["El ganado  a rastro TIF cuenta con Guía REEMO, fleje y CZMN", "El ganado a rastro municipal cuenta con Guía REEMO y fleje."],
            "0": ["Moviliza ganado a rastro sin Guía REEMO", "Moviliza ganado a rastro sin fleje", "Moviliza ganado a rastro TIF sin CZMN"]
          }
        },
        {
          "pregunta": "2.	Los animales que egresen del corral de engorda y cuyo destino sea a un rastro, deben ser identificados con su arete SINIIGA y su número de identificación debe de ser registrado.",
          "respuestas": {
            "1": ["El ganado enviado a rastro está identificado y registrado en bitácora"],
            "0": ["Envía ganado a rastro sin identificador SINIIGA", "No registra en bitácora el ganado al enviado a rastro"]
          }
        },
        {
          "pregunta": "3.	Los animales que egresen del corral de engorda y cuyo destino sea a un rastro, deben de contar con su guía de tránsito REEMO y su número de folio debe de ser registrado.",
          "respuestas": {
            "1": ["El ganado enviado a rastro está identificado y registrado en bitácora"],
            "0": ["Envía ganado a rastro sin identificador SINIIGA", "No registra en bitácora el ganado al enviado a rastro"]
          }
        }
      ]
    },
    "seccion4":
    {
      "titulo": "CUARTA SECCION - OTROS",
      "questionario": [
        {
          "pregunta": "1.	Cualquier animal que nazca en el CE deberá ser documentado en bitácora correspondiente, marcado a fuego con CN, identificado con arete SINIIGA correlacionado con la madre y permanecer ahí hasta su sacrificio.",
          "respuestas": {
            "1": ["Las crías están registradas y correlacionadas con la madre"],
            "0": ["No lleva bitácora de los nacimientos", "Hay crías correlacionadas con las madre sin registrar", "Hay crías sin registrar y sin correlacionar con la madre"]
          }
        },
        {
          "pregunta": "2.	El CE debe mantener registros de todos los animales que mueran, así como de cualquier animal caído que deba ser sacrificado. Los registros deben especificar la identificación de estos animales.",
          "respuestas": {
            "1": ["El registro de los muertos en corral está actualizado"],
            "0": ["No lleva bitácora de muertos", "La bitácora de muertos no está actualizada"]
          }
        }
      ]
    }
  };
  formularioCEA = {
    "preguntasIniciales1": {
      "titulo": "NO HAY",
      "questionario": [
        {
          "pregunta": "Engorda intensiva total",
          "respuestas": {
            "1": ["engorda y finalización"],
            "0": ["preengorda"]
          }
        },
        {
          "pregunta": "Presencia de ganado en pastoreo",
          "respuestas": {
            "1": ["ganado en praderas"],
            "0": ["ganado confinado"]
          }
        },
        {
          "pregunta": "Hembras gestantes o recién paridas en el CEA",
          "respuestas": {
            "1": ["hembras gestantes", "hembras recién paridas"],
            "0": ["No hay hembras gestantes o paridas en el corral"]
          }
        },
        {
          "pregunta": "Animales de otras especies zootécnicas",
          "respuestas": {
            "1": ["caballos", "cerdos", "ovinos", "caprinos", "aves"],
            "0": ["No hay animales de otras especies zootécnicas"]
          }
        },
        {
          "pregunta": " Otra actividad pecuaria dentro del corral engorda ",
          "respuestas": {
            "1": ["venta de alimento o insumos", "crianza de otras especies zootécnicas", "sacrificio y/o procesamiento de animales"],
            "0": ["El corral no tiene otra actividad zootécnica"]
          }
        }
      ]
    },
    "preguntasIniciales2": {
      "titulo": "INSTALACIONES",
      "questionario": [
        {
          "pregunta": "Corrales limpios",
          "respuestas": {
            "1": ["corrales limpios"],
            "0": ["estiércol",
              "lodo ",
              "piedras",
              "basura orgánica",
              "basura inorgánica"]
          }
        },
        {
          "pregunta": "Ganado caminando fuera del corral",
          "respuestas": {
            "1": ["en pasillo de alimentación", "en pasillo de arreo", "en patios"],
            "0": ["No hay ganado fuera de los corrales"]
          }
        },
        {
          "pregunta": "Se encuentra ganado enfermo en un mismo corral con ganado sano.",
          "respuestas": {
            "1": ["en corrales de reciba", "en corrales de producción "],
            "0": ["No hay ganado enfermo junto con el sano"]
          }
        },
        {
          "pregunta": "La engorda cuenta con un corral específico para dar tratamiento al ganado enfermo.",
          "respuestas": {
            "1": ["enfermería"],
            "0": ["tratamiento de ganado en corral"]
          }
        },
        {
          "pregunta": "Medicamentos utilizados en el corral de engorda aprobado",
          "respuestas": {
            "1": ["antibióticos, antinflamatorios, vitaminas, antiparasitarios, anabólicos"],
            "0": ["No usa medicamentos en el corral"]
          }
        },
        {
          "pregunta": "Fosa para animales muertos o tratamiento para animales muertos",
          "respuestas": {
            "1": ["fosa para cadáveres", "planta de rendimiento fuera del corral", "planta de rendimiento dentro del corral"],
            "0": ["No cuenta con fosa o tratamiento para cadáveres"]
          }
        }
      ]
    },
    "seccion1":
    {
      "titulo": "PRIMERA SECCION - INSTALACIONES DEL CEA",
      "questionario": [
        {
          "pregunta": "1.	Un corral de engorda aprobado consistirá del corral de engorda completo. No están permitidas otras PSG o UPP dentro del mismo predio.",
          "respuestas": {
            "1": ["Opera con su PSG"],
            "0": ["Hay otra PSG en el CEA", "Hay una UPP en el CEA"]
          }
        },
        {
          "pregunta": "2.	Cada corral de engorda debe estar aprobado por SENASICA quien verifica que se haya cumplido con todos los requisitos mínimos.",
          "respuestas": {
            "1": ["Aprobación vigente"],
            "0": ["Aprobación vencida"]
          }
        },
        {
          "pregunta": "3.	El Estado designará personal técnico para coordinar la vigilancia y supervisión de cada corral de engorda aprobado entre el gobierno estatal, SENASICA-SADER y el Comité de Fomento y Protección Pecuaria de Sinaloa.",
          "respuestas": {
            "1": ["Personal oficial SAyG"],
            "0": ["No asistió personal oficial SAyG"]
          }
        },
        {
          "pregunta": "4.	Un MVZ RA por SENASICA, es el responsable de inspeccionar y revisar los registros de los corrales de engorda aprobado y verificar que el ingreso y egreso de ganado cumpla con todos los requisitos de trazabilidad esto será por lo menos cada 30 días.",
          "respuestas": {
            "1": ["Personal oficial CEFPPSIN"],
            "0": ["No asistió personal oficial CEFPPSIN"]
          }
        },
        {
          "pregunta": "5.	La cerca perimetral debe ser adecuada para prevenir la entrada o salida de los animales de las instalaciones. Si existen propiedades adyacentes en donde haya ganado, deberá haber doble cerca para prevenir el contacto entre animales.",
          "respuestas": {
            "1": ["Cerca perimetral completa y en buen estado"],
            "0": ["No tiene cerca perimetral",
              "Cerca perimetral en mal estado al sur del CEA",
              "Cerca perimetral en mal estado al norte del CEA",
              "Cerca perimetral en mal estado al este del CEA",
              "Cerca perimetral al oeste del CEA",
              "Falta tramo de la cerca al sur del CEA",
              "Falta tramo de cerca perimetral al norte del CEA",
              "Falta tramo de cerca perimetral al este del CEA",
              "Falta tramo de cerca perimetral al oeste del CEA"]
          }
        },
        {
          "pregunta": "6.	Se requiere que todos los corrales de engorda aprobados confinen a los animales en un corral que esté seco en donde no se permite el pastoreo.",
          "respuestas": {
            "1": ["Ganado en confinamiento"],
            "0": ["Ganado en pastoreo"]
          }
        },
        {
          "pregunta": "7.	Las instalaciones y todo el equipo deben ser adecuados para el manejo de animales de forma segura y eficaz, según sea necesario.",
          "respuestas": {
            "1": ["Cuenta con corrales, trampa, bascula, y shute adecuados y seguros"],
            "0": ["No cuenta con corrales, trampa, bascula, y shute adecuados y seguros"]
          }
        },
        {
          "pregunta": "8.	Los predios colindantes a los corrales de engorda aprobados serán revisados para checar si existe la presencia de ganado bovino. Los predios adyacentes a los corrales de engorda en donde exista la presencia de ganado bovino deberán probar a sus animales de forma anual.",
          "respuestas": {
            "1": ["No hay hatos adyacentes", "Hay un hato adyacente con prueba vigente de 1 año"],
            "0": ["Hay un hato adyacente sin dictámenes de prueba de TB y BR", "Hay un hato adyacente con dictámenes de prueba de TB y BR vencidos"]
          }
        },
        {
          "pregunta": "9.	Cuenta con infraestructura adecuada para monitorear la movilización de ganado en tiempo y forma (entradas y salidas de ganado en bitácoras físicas y/o electrónicas).",
          "respuestas": {
            "1": ["Bitácora física", "Bitácora electrónica"],
            "0": ["No tiene bitácora", "La bitácora no está actualizada"]
          }
        },
        {
          "pregunta": "10.	El CEA permite la inspección de sus instalaciones y archivos documentales de ingreso y egreso de ganado cuando se les solicite, durante horarios de trabajo.",
          "respuestas": {
            "1": ["Permite la supervisión"],
            "0": ["No permite la supervisión"]
          }
        }
      ]
    },
    "seccion2":
    {
      "titulo": "SEGUNDA SECCION - ENTRADA DE GANADO A CEA",
      "questionario": [
        {
          "pregunta": "1.	Se documenta el ingreso y egreso del ganado a las instalaciones.  Los archivos de orígenes de todos los lotes de animales deberán ser estrictamente controlados.",
          "respuestas": {
            "1": ["Bitácora física actualizada", "Bitácora electrónica actualizada"],
            "0": ["No tiene bitácora", "La bitácora no está actualizada"]
          }
        },
        {
          "pregunta": "2.	Todos los vehículos que movilicen ganado desde la entrada al estado al corral, del corral al rastro deberán estar flejados. Los números de fleje así como el nombre y título del personal que lo aplicó y que lo remueve deberán ser registrados.",
          "respuestas": {
            "1": ["Registra en bitácora los flejes y el responsable"],
            "0": ["No registra flejes", "No registra responsable de flejes", "No esta actualizado el registro de flejes en bitácora"]
          }
        },
        {
          "pregunta": "3.	Cada lote de ganado de otro Estado que entre a un CEA deberá tener su CZMN y la guía de transito REEMO. Esto incluye el ganado que se desplaza de un CEA a otro CEA.",
          "respuestas": {
            "1": ["El ganado cuenta con Guía REEMO y CZMN"],
            "0": ["Moviliza ganado sin Guía REEMO", "No se anexó al expediente la Guía REEMO", "Moviliza ganado sin CZMN", "No se anexó al expediente el CZMN"]
          }
        },
        {
          "pregunta": "4.	Todos los animales deberán portar desde origen arete de identificación oficial (SINIIGA) y marca CN. Cada arete y marca de fuego deberá ser verificada y registrada en los puntos de entrada (PVIF), y a la llegada al CEA.",
          "respuestas": {
            "1": ["Todo el ganado porta aretes SINIIGA y marca CN"],
            "0": ["Hay ganado sin ambos aretes SINIIGA", "Hay ganado sin arete SINIIGA tipo bandera", "Hay ganado sin arete SINIIGA tipo botón", "Una parte del ganado no porta la marca CN", "El total del ganado no porta la marca CN"]
          }
        },
        {
          "pregunta": "5.	Todos los animales que lleguen al CEA de otros Estados deberán tener una prueba negativa vigente de TB y BR dentro de los 60 días antes de entrar a las instalaciones.",
          "respuestas": {
            "1": ["Cuentan con dictámenes de prueba de TB y BR negativos, vigentes"],
            "0": ["No cuentan con dictámenes de prueba de TB y BR", "No cuenta con dictamen de prueba TB", "No cuenta con dictamen de prueba de BR", "Cuenta con dictámenes de prueba de TB y BR vencidos"]
          }
        },
        {
          "pregunta": "6.	Animales que no se sepa si fueron expuestos o infectados con TB que vengan de cualquier estado, deben ser probados por un médico oficial o un médico aprobado con una tasa de respuesta a la PPC ≥al 0.5%.",
          "respuestas": {
            "1": ["Cuentan con dictámenes de prueba de TB y BR negativos realizados por un MVZRA con tasa de respuesta la PPC ≥al 0.5%"],
            "0": ["Cuentan con dictámenes de prueba de TB y BR negativos realizados por un MVZRA con tasa de respuesta la PPC < al 0.5%"]
          }
        },
        {
          "pregunta": "7.	Los animales que ingresen a los CEA ubicados en Estados o Zonas con status NA, AP o MA pueden provenir de estados o zonas con cualquier estatus a TB. ",
          "respuestas": {
            "1": ["Cumple"],
            "0": []
          }
        },
        {
          "pregunta": "8.	Becerros menores de doce meses de edad de hatos cuarentenados deberán tener una prueba negativa de TB dentro de los 60 días previo a su entrada a las instalaciones. Este ganado deberá ser probado por un MVZ RA de SADER con una tasa de respuesta mayor o igual al 0.5%. Este ganado deberá mantenerse por lo menos diez metros separados del resto de los animales en el CEA.  Ganado de 12 meses o mayor de hatos cuarentenados, no tienen permitido movilizarse a los CEA.",
          "respuestas": {
            "1": ["Cuentan con dictámenes de prueba de TB negativos, vigentes"],
            "0": ["No cuentan con dictámenes de prueba de TB", "Cuenta con dictámenes de prueba de TB vencidos", "Cuentan con dictámenes de prueba de TB negativos realizados por un MVZRA con tasa de respuesta la PPC < al 0.5%", "El CEA aloja animales de hato cuarentenado"]
          }
        }
      ]
    },
    "seccion3":
    {
      "titulo": "TERCERA SECCION - EGRESOS",
      "questionario": [
        {
          "pregunta": "1.	Para ser considerado un CEA, todos los animales del corral podrán ir directamente a un rastro aprobado o a otro CEA en vehículo flejado, con CZMN y con guía de tránsito REEMO.",
          "respuestas": {
            "1": ["Envía ganado a rastro autorizado/CEA  con Guía REEMO, fleje y CZMN (rastro municipal no requiere)"],
            "0": ["Envía ganado a rastro no autorizado", "Envía ganado a Corral No Aprobado", "Envía ganado a sacrificio sin Guía REEMO", "Envía ganado a sacrificio sin fleje", "Envía ganado a sacrificio sin CZMN"]
          }
        },
        {
          "pregunta": "2	Los animales que egresen del corral de engorda aprobado y cuyo destino sea a un rastro, deben ser identificados individualmente y su número de identificación debe de ser registrado",
          "respuestas": {
            "1": ["El ganado enviado a rastro está identificado y registrado en bitácora"],
            "0": ["Envía ganado a rastro sin identificador SINIIGA", "No registra en bitácora el ganado al enviado a rastro"]
          }
        },
        {
          "pregunta": "3	Los animales que salen del CEA para sacrificio, deben estar identificados individualmente y registrar su número (SINIIGA) de identificación.",
          "respuestas": {
            "1": ["El ganado enviado a rastro está identificado y registrado en bitácora"],
            "0": ["Envía ganado a rastro sin identificador SINIIGA", "No registra en bitácora el ganado enviado a rastro"]
          }
        }
      ]
    },
    "seccion4":
    {
      "titulo": "CUARTA SECCION - OTROS",
      "questionario": [
        {
          "pregunta": "1.	Cualquier animal que nazca en el CEA deberá ser documentado en bitácora correspondiente, marcado a fuego con CN, identificado con arete SINIIGA correlacionado con la madre y permanecer ahí hasta su sacrificio.",
          "respuestas": {
            "1": ["No hay nacimientos", "Las crías están registradas y correlacionadas con la madre"],
            "0": ["No lleva bitácora de los nacimientos", "hay crías correlacionadas con las madre sin registrar", "Hay crías sin registrar, sin correlacionar con la madre", "Hay crías registradas y correlacionadas con la madre; que no tienen arete SINIIGA"]
          }
        },
        {
          "pregunta": "2.	El CEA debe mantener registros de todos los animales que mueran, así como de cualquier animal caído que deba ser sacrificado. Los registros deben especificar la identificación de estos animales.",
          "respuestas": {
            "1": ["El registro de los muertos en corral está actualizado"],
            "0": ["No lleva bitácora de muertos", "La bitácora de muertos no está actualizada"]
          }
        },
        {
          "pregunta": "3.	El CEA cuenta con fosa o tratamiento de cadáveres. ",
          "respuestas": {
            "1": ["fosa para cadáveres", "planta de rendimiento fuera del corral", "planta de rendimiento dentro del corral"],
            "0": ["No cuenta con fosa o tratamiento para cadáveres"]
          }
        }
      ]
    }
  }

  //Variables
  location = [
    {
      region: 'SUR',
    },
    {
      region: 'CENTRO',
    },
    {
      region: 'NORTE',
    }
  ];
  tipoDeCorral = [
    {
      tipo: 'CACN',
    },
    {
      tipo: 'CE',
    },
    {
      tipo: 'CEA',
    }
  ];
  directoryData: any;
  directoryDataFiltered: object[] = [];
  cantidadDeVariables = 0;
  //Variables booleanas que indicas el tipo de formulario
  isCACNform = false;
  isCEform = false;
  isCEAform = false;
  isNothing = true;

  //Formularios
  generalInfoForm = this.fb.group({
    region: [],
    tipoDeCorral: [],
    infoCliente: [],
    TIPO_DE_CORRAL: [],
    NOMBRE: [],
    PROPIETARIO: [{ value: '', disabled: true }],
    DIRECCION: [{ value: '', disabled: true }],
    MUNICIPIO: [{ value: '', disabled: true }],
    PSG: [{ value: '', disabled: true }],
    LATITUD: [{ value: '', disabled: true }],
    LONGITUD: [{ value: '', disabled: true }],
  });
  //Dinamic forms
  answersFormCACN = this.fb.group({
    inventario_de_ganado: [],
    CACN: [],
    MVZ_CACN: [],
    MVZ_RA_SUPERVISOR: [],
    CACN_answersSection1: this.fb.array([]),
    CACN_answersSection2: this.fb.array([]),
    CACN_answersSection3: this.fb.array([]),
    CACN_answersSection4: this.fb.array([])
  });
  get CACN_answersSection1() {
    return this.answersFormCACN.controls["CACN_answersSection1"] as FormArray;
  }
  get CACN_answersSection2() {
    return this.answersFormCACN.controls["CACN_answersSection2"] as FormArray;
  }
  get CACN_answersSection3() {
    return this.answersFormCACN.controls["CACN_answersSection3"] as FormArray;
  }
  get CACN_answersSection4() {
    return this.answersFormCACN.controls["CACN_answersSection4"] as FormArray;
  }
  addCACN_AnswersSection1Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CACN_answersSection1.push(answerData);
    }
  }
  addCACN_AnswersSection2Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CACN_answersSection2.push(answerData);
    }
  }
  addCACN_AnswersSection3Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CACN_answersSection3.push(answerData);
    }
  }
  addCACN_AnswersSection4Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CACN_answersSection4.push(answerData);
    }
  }

  answersFormCE = this.fb.group({
    capacidad_instalada: [],
    capacidad_utilizada: [],
    numero_corrales_internos: [],
    existencia_corrales_alternos_o_cuarentena: [],
    numero_de_autorizacion: [],
    vigencia_de_autorizacion: [],
    medico_veterinario_responsable_de_supervision: [],
    periodo_de_supervision: [],
    CE_answersSection1: this.fb.array([]),
    CE_answersSection2: this.fb.array([]),
    CE_answersSection3: this.fb.array([]),
    CE_answersSection4: this.fb.array([]),
    observaciones_y_acuerdos: [],
  });
  get CE_answersSection1() {
    return this.answersFormCE.controls["CE_answersSection1"] as FormArray;
  }
  get CE_answersSection2() {
    return this.answersFormCE.controls["CE_answersSection2"] as FormArray;
  }
  get CE_answersSection3() {
    return this.answersFormCE.controls["CE_answersSection3"] as FormArray;
  }
  get CE_answersSection4() {
    return this.answersFormCE.controls["CE_answersSection4"] as FormArray;
  }
  addCE_AnswersSection1Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CE_answersSection1.push(answerData);
    }
  }
  addCE_AnswersSection2Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CE_answersSection2.push(answerData);
    }
  }
  addCE_AnswersSection3Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CE_answersSection3.push(answerData);
    }
  }
  addCE_AnswersSection4Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CE_answersSection4.push(answerData);
    }
  }

  answersFormCEA = this.fb.group({
    preguntas_iniciales1: this.fb.array([]),
    preguntas_iniciales2: this.fb.array([]),
    capacidad_instalada: [],
    capacidad_utilizada: [],
    numero_corrales_internos: [],
    existencia_corrales_alternos_o_cuarentena: [],
    numero_de_autorizacion: [],
    vigencia_de_autorizacion: [],
    medico_veterinario_responsable_del_CEA: [],
    medico_veterinario_responsable_de_supervision: [],
    periodo_de_supervision: [],
    numero_de_cabezas_en_el_CEA: [],
    numero_de_cabezas_ingresadas_al_CEA: [],
    cabezas_engordadas: [],
    cabezas_egresadas_del_CEA_para_sacrificio_en_rastros: [],
    numero_cabezas_muertas_en_el_CEA: [],
    numero_cabezas_en_el_CEA_ultimo_dia_mes_evaluacion: [],
    CEA_answersSection1: this.fb.array([]),
    CEA_answersSection2: this.fb.array([]),
    CEA_answersSection3: this.fb.array([]),
    CEA_answersSection4: this.fb.array([]),
    observaciones_y_acuerdos: [],
  });
  get preguntas_iniciales1() {
    return this.answersFormCEA.controls["preguntas_iniciales1"] as FormArray;
  }
  get preguntas_iniciales2() {
    return this.answersFormCEA.controls["preguntas_iniciales2"] as FormArray;
  }
  get CEA_answersSection1() {
    return this.answersFormCEA.controls["CEA_answersSection1"] as FormArray;
  }
  get CEA_answersSection2() {
    return this.answersFormCEA.controls["CEA_answersSection2"] as FormArray;
  }
  get CEA_answersSection3() {
    return this.answersFormCEA.controls["CEA_answersSection3"] as FormArray;
  }
  get CEA_answersSection4() {
    return this.answersFormCEA.controls["CEA_answersSection4"] as FormArray;
  }
  addPreguntasIniciales1Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: []
      });
      this.preguntas_iniciales1.push(answerData);
    }
  }
  addPreguntasIniciales2Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: []
      });
      this.preguntas_iniciales2.push(answerData);
    }
  }
  addCEA_AnswersSection1Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CEA_answersSection1.push(answerData);
    }
  }
  addCEA_AnswersSection2Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CEA_answersSection2.push(answerData);
    }
  }
  addCEA_AnswersSection3Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CEA_answersSection3.push(answerData);
    }
  }
  addCEA_AnswersSection4Data(cantidad: number) {
    for (let index = 0; index < cantidad; index++) {
      const answerData = this.fb.group({
        respuesta: [],
        observaciones: [],
        observacionesDelMedico: [],
        fechaDeCumplimiento: [],
      });
      this.CEA_answersSection4.push(answerData);
    }
  }

  constructor(private fb: FormBuilder, private _mongodb: MongodbService) {
    this.addCACN_AnswersSection1Data(10);
    this.addCACN_AnswersSection2Data(4);
    this.addCACN_AnswersSection3Data(3);
    this.addCACN_AnswersSection4Data(3);

    this.addCE_AnswersSection1Data(10);
    this.addCE_AnswersSection2Data(9);
    this.addCE_AnswersSection3Data(3);
    this.addCE_AnswersSection4Data(2);

    this.addCEA_AnswersSection1Data(10);
    this.addCEA_AnswersSection2Data(8);
    this.addCEA_AnswersSection3Data(3);
    this.addCEA_AnswersSection4Data(3);
    this.addPreguntasIniciales1Data(5);
    this.addPreguntasIniciales2Data(6)
  }

  ngOnInit(): void {

  }

  //Función que se activa cada vez que se cambia el dropdown de Region
  async querySelectedRegionDirectory() {
    let regionValue = this.generalInfoForm.value['region'];
    if (regionValue != null) {
      let results: any = await this._mongodb.queryRegion(regionValue);
      this.directoryData = results;
      console.log(this.directoryData);
      this.filterByCorralType();
    }
    else {
      this.directoryDataFiltered = [];
      this.generalInfoForm.patchValue({ tipoDeCorral: null });
      this.generalInfoForm.patchValue({ infoCliente: null });
    }
  }
  //Función que filtra la búsqueda por tipo de corral y muestra el formulario correspondiente
  filterByCorralType() {
    let filteredResults: object[] = [];
    if (this.generalInfoForm.value['tipoDeCorral'] != null && this.generalInfoForm.value['region'] != null) {
      this.generalInfoForm.patchValue({ infoCliente: null });
      let type = this.generalInfoForm.value['tipoDeCorral'];
      this.directoryData.results.forEach((single: directoryDataType) => {
        let corralType = single.TIPO_DE_CORRAL.split(' ')[0];
        if (type == corralType) {
          filteredResults.push(single);
        }
      });
      this.directoryDataFiltered = filteredResults;
      console.log(filteredResults);
      //Mostramos formulario
      switch (type) {
        case 'CACN':
          this.isCACNform = true;
          this.isCEform = false;
          this.isCEAform = false;
          this.isNothing = false;

          break;
        case 'CE':
          this.isCACNform = false;
          this.isCEform = true;
          this.isCEAform = false;
          this.isNothing = false;

          break;
        case 'CEA':
          this.isCACNform = false;
          this.isCEform = false;
          this.isCEAform = true;
          this.isNothing = false;
          break;

        default:
          this.isCACNform = false;
          this.isCEform = false;
          this.isCEAform = false;
          this.isNothing = true;
          break;
      }
    }
    else {
      this.isCACNform = false;
      this.isCEform = false;
      this.isCEAform = false;
      this.isNothing = true;
      this.directoryDataFiltered = [];
      this.generalInfoForm.patchValue({ infoCliente: null });
    }
  }
  //Función para obtener los datos del cliente seleccionado
  getClientInfo() {
    var clientInfo = this.generalInfoForm.value['infoCliente'];
    if (clientInfo != null) {
      this.generalInfoForm.patchValue({
        PROPIETARIO: clientInfo['PROPIETARIO'],
        DIRECCION: clientInfo['DIRECCION'],
        MUNICIPIO: clientInfo['MUNICIPIO'],
        PSG: clientInfo['PSG'],
        LATITUD: clientInfo['LATITUD'],
        LONGITUD: clientInfo['LONGITUD'],
      });
    }
  }
  //Función que envía las respuestas del formulario de CACN
  sendCACN() {
    console.log(this.answersFormCACN.value);

  }
  sendCE() {
    console.log(this.answersFormCE.value);
  }
  sendCEA() {
    console.log(this.answersFormCEA.value);
  }
}

interface directoryDataType {
  _id: string,
  TIPO_DE_CORRAL: string,
  NOMBRE: string,
  PROPIETARIO: string,
  DIRECCION: string,
  MUNICIPIO: string,
  PSG: string,
  LATITUD: number,
  LONGITUD: number
}
