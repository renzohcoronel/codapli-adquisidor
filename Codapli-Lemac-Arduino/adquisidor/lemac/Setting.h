#include "SettingItem.h"

class Setting {
      private:
    
      SettingItem celdas[3] = {{500,-6561.95},{1000,105.293},{2000,52.6465}};
      

      public :
        
      Setting();
      float getMultiplicadorCelda(int c);
    
};
