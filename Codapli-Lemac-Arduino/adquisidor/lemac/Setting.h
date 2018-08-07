#include "SettingItem.h"

class Setting {
      private:
    
      SettingItem celdas[3] = {{500,210.586},{1000,105.293},{2000,52.6465}};
      SettingItem lvdts[3] = {{15,10.0f},{20,10.0f},{25,10.0f}};
      unsigned long intervals[6] = {1000,60000,600000,900000,1800000,3600000};
      

      public :
        
      Setting();
      float getMultiplicadorCelda(int c);
      float getMultiplicadorLvdt(int id);
      unsigned long getIntervalo(int pos);
};
