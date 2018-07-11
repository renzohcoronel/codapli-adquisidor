#include "SettingItem.h"

class Setting {
      private:
    
      SettingItem celdas[3] = {{500,10.0f},{1000,10.0f},{2000,10.0f}};
      SettingItem lvdts[3] = {{15,10.0f},{20,10.0f},{25,10.0f}};

      public :
        
      Setting();
      float getMultiplicadorCelda(int c);
      float getMultiplicadorLvdt(int id);
};
