export type DataModel = {
  nombreComunidad: string
  // Primarias
  primaria: string
  claveEscuelaPrimaria: string
  claveEscuelaPrimariaCompleta: string
  directivoPrimaria: string
  telefonoDelProfesorDeLaPrimaria: string
  numeroProgresivoPrimaria: number
  // preescolares
  preescolar: string
  claveEscuelaPreescolar: string
  claveEscuelaPreescolarCompleta: string
  directivoPreescolar: string
  telefonoDelProfesorDePreescolar: string
  numeroProgresivoPreescolar: string
  // Educación inicial
  inicial: string
  claveEscuelaInicial: string
  claveEscuelaInicialCompleta: string
  directivoInicial: string
  telefonoDelProfesorDeInicial: string
  // Albergues
  albergueEscolar: string
  claveEscuelaAlbergueEscolar: string
  directivoAlbergueEscolar: string
  telefonoDelProfesorDelAlbergueEscolar: string
}