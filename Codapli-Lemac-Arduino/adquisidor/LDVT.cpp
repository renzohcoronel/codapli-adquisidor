#include "LDVT.h"

LDVT::LDVT() {
};

LDVT::LDVT(int pin){
  pinAnalog = pin;
};
  
void LDVT::setConst(int ctte){
  constante = ctte;
};
 
float LDVT::getValue() {
  return analogRead(pinAnalog)*constante / 5 ;
};
  