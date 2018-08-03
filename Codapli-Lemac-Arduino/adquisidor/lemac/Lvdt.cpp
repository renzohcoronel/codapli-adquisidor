#include "Lvdt.h"

Lvdt::Lvdt(){
};

Lvdt::Lvdt(int pin){
  pinAnalog = pin;
  constante=1;
};

Lvdt::Lvdt(int pin, float cte ){
  pinAnalog = pin;
  constante = cte;
};
  
void Lvdt::setConstante(float c){
  constante = c;
};
 
float Lvdt::getValue() {
  return analogRead(pinAnalog);
  //return ((analogRead(pinAnalog)*1024)/5)*constante; //Falta Vin
};

