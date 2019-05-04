#include <Arduino.h>

class Lvdt {
  private:
    float tipo;
    int pinAnalog;

  public:
    Lvdt();
    Lvdt(int);
    Lvdt(int, int);
    void setTipo(int);
    int getTipo();
    float getValue();

};
