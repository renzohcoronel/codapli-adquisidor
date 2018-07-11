#include "Celda.h"
#include "Lvdt.h"

class Setting {}
      public
    
      Celda celdas[3] = {new Celda(500,10),new Celda(1000,10),new Celda(2000,10)}
      Lvdt lvdts[3] = {new Lvdt(10,10),new Lvdt(20,10),new Lvdt(25,10)}

      private
        
      void Setting();
      float getMultiplicadorCelda(int c);
      float getMultiplicadorLvdt(int id);
};
