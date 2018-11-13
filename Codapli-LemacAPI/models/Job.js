

var Job = function () {
    this.fecha;
    // Informacion del ensayo
    this.tipoEnsayo = '';
    this.desplazamientImpueso = 0;
    this.tipoMuestra = '';
    this.temperaturaEnsayo = 0;
    this.frecuencia = 0;
    this.desplazamiento = 0;
    this.material = '';
    this.diametro = 0;
    this.espesor = 0;
    this.ranura = 0;
    this.carga = 0;
    this.alto = '';
    this.ancho = '';
    this.profundidad = '';
    this.muestra = '';
    this.temperatura = 0;
    this.recorridoPlaca = 0;
    // -----------------------
    // propiedades de control.
    this.pathFile = '';
    this.registrando = false;
    this.values = [];
}

module.exports = Job;