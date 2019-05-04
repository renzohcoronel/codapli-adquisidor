#include "Lvdt.h"

Lvdt::Lvdt(){
};

Lvdt::Lvdt(int pin){
  pinAnalog = pin;
  tipo = 50;
};

Lvdt::Lvdt(int pin, int m ){
  pinAnalog = pin;
  tipo = m;
};
  
void Lvdt::setTipo(int m){
  tipo = m;
};

int Lvdt::getTipo(){
  return tipo;
  }
 
float Lvdt::getValue() {
  int a = analogRead(pinAnalog);
  Serial.println(a);
  float val = map(a,0,1023,tipo,0);
  Serial.println(val);
  return (val - (tipo/2))/-10;
  //return ((analogRead(pinAnalog)*1024)/5)*constante; //Falta Vin
};
