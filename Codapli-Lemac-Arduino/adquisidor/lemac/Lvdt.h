#include <Arduino.h>

class Lvdt {
  private:
    long tipo;
    int pinAnalog;

  public:
    Lvdt();
    Lvdt(int);
    Lvdt(int, int);
    void setTipo(int);
    long getValue();

};
