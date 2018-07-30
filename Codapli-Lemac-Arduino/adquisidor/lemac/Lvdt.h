#include <Arduino.h>

class Lvdt {
  private:
    float constante;
    int pinAnalog;

  public:
    Lvdt();
    Lvdt(int);
    Lvdt(int, float);
    void setConstante(float);
    float getValue();

};
