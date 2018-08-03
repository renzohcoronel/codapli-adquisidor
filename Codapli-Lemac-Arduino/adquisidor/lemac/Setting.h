#include "SettingItem.h"

class Setting {
      private:
    
      SettingItem celdas[3] = {{500,210.586},{1000,105.293},{2000,52.6465}};
      SettingItem lvdts[3] = {{15,10.0f},{20,10.0f},{25,10.0f}};

      public :
        
      Setting();
      float getMultiplicadorCelda(int c);
      float getMultiplicadorLvdt(int id);
};
