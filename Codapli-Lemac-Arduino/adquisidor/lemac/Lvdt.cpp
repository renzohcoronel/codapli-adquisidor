#include "Lvdt.h"

Lvdt::Lvdt(){
};

Lvdt::Lvdt(int pin){
  pinAnalog = pin;
  constante=0.0048828125;
};

Lvdt::Lvdt(int pin, float cte ){
  pinAnalog = pin;
  constante = cte;
};
  
void Lvdt::setConstante(float c){
  constante = c;
};
 
float Lvdt::getValue() {
  return analogRead(pinAnalog)*constante;
};

