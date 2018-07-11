#include "Setting.h"

void Setting::Setting(){

}

float Setting::getMultiplicadorCelda(int c){
  for (int i=1, i<4, i++){
    
    if(celdas[i].getCapacidad() == c){
    
      return celdas[i].getMultiplicador;
    
  }
}

float Setting::getMultiplicadorLvdt(int id){

  for (int i=1, i<4, i++){

    if(lvdts[i].getIdentificador() == c){

      return lvdts[i].getMultiplicador;

    }

}
