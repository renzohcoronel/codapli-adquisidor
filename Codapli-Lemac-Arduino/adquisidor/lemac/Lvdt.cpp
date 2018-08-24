#include "Lvdt.h"

Lvdt::Lvdt(){
};

Lvdt::Lvdt(int pin){
  pinAnalog = pin;
  tipo = 250;
};

Lvdt::Lvdt(int pin, int m ){
  pinAnalog = pin;
  tipo = m;
};
  
void Lvdt::setTipo(int m){
  tipo = m;
};
 
long Lvdt::getValue() {
  int a = analogRead(pinAnalog);
  long val = map(a,0,1023,tipo,0);
  return val;
  //return ((analogRead(pinAnalog)*1024)/5)*constante; //Falta Vin
};

