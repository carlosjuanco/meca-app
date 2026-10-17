export type DataModel = {
  idComunidad: number
  nombreComunidad: string
  // Primarias
  primaria: string
  claveEscuelaPrimaria: string
  claveEscuelaPrimariaCompleta: string
  directivoPrimaria: string
  idDirectivoPrimaria: number
  telefonoDelProfesorDeLaPrimaria: string
  numeroProgresivoPrimaria: number
  // preescolares
  preescolar: string
  claveEscuelaPreescolar: string
  claveEscuelaPreescolarCompleta: string
  directivoPreescolar: string
  idDirectivoPreescolar: number
  telefonoDelProfesorDePreescolar: string
  numeroProgresivoPreescolar: string
  // Educación inicial
  inicial: string
  claveEscuelaInicial: string
  claveEscuelaInicialCompleta: string
  directivoInicial: string
  idDirectivoInicial: number
  telefonoDelProfesorDeInicial: string
  // Albergues
  albergueEscolar: string
  claveEscuelaAlbergueEscolar: string
  directivoAlbergueEscolar: string
  idDirectivoAlbergueEscolar: number
  telefonoDelProfesorDelAlbergueEscolar: string
}