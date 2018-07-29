#include "Lvdt.h"

Lvdt::Lvdt(){
};

Lvdt::Lvdt(int pin){
  pinAnalog = pin;
  constante=0.0048828125;
};
  
void Lvdt::setConstante(int c){
  constante = c;
};
 
float Lvdt::getValue() {
  value = analogRead(pinAnalog)*constante;
  return value;
};

