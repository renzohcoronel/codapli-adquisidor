#include <Arduino.h>


#ifndef LDVT_h
#define LDVT_h

class LDVT {

private:
  float value;
  int constante;
  int pinAnalog; 

public:
  LDVT();
  LDVT(int pin);
  void setConst(int ctte);
  float getValue();
  
};

#endif
