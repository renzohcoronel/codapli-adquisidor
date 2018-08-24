#include "Setting.h"

 Setting::Setting(){

}

float Setting::getMultiplicadorCelda(int c){
  for (int i=0; i<3; i++){
    
    if(celdas[i].getIdentificador() == c){
    
      return celdas[i].getMultiplicador();
    
  }
  }  
  return -1;
}

unsigned long Setting::getIntervalo(int pos){
  return intervals[pos];
  }
