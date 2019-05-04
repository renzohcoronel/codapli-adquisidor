#include <Arduino.h>

class Lvdt {
  private:
    float tipo;
    int pinAnalog;

  public:
    Lvdt();
    Lvdt(int);
    Lvdt(int, float);
    void setTipo(float);
    float getTipo();
    float getValue();

};
