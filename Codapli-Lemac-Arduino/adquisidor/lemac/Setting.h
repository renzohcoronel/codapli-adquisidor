#include "SettingItem.h"

class Setting {
      private:
    
      SettingItem celdas[3] = {{500,10},{1000,10},{2000,10}};
      SettingItem lvdts[3] = {{15,10},{20,10},{25,10}};

      public :
        
      Setting();
      float getMultiplicadorCelda(int c);
      float getMultiplicadorLvdt(int id);
};
