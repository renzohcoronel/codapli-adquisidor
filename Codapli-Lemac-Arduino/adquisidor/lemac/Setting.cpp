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

float Setting::getMultiplicadorLvdt(int id){

  for (int i=0; i<3; i++) {

    if(lvdts[i].getIdentificador() == id){

      return lvdts[i].getMultiplicador();

    }
  }
  return -1;
}
