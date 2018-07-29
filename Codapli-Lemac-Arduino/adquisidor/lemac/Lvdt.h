#include <Arduino.h>

class Lvdt {
  private:
    float value;
    float constante;
    int pinAnalog;

  public:
    Lvdt();
    Lvdt(int);
    void setConstante(int);
    float getValue();

};
