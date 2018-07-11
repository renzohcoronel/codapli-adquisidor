#include "Lvdt.h"

void Lvdt::Lvdt(int id , float m){
      identificador=id;
      multiplicador=m;
}


int Lvdt::getIdentificador(){
  return identificador;
}

float Lvdt::getMultiplicador(){
  return multiplicador;
}
