#include "Celda.h"

void Celda::Celda(int c,float m){
    capacidad=c;
    multiplicador:m;
}

int Celda::getCapacidad(){
    return capacidad;
}


float Celda::getMultiplicador(){
    return multiplicador;
}
