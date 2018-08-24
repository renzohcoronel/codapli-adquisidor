#include "SettingItem.h"

class Setting {
      private:
    
      SettingItem celdas[3] = {{500,-6575.25},{1000,105.293},{2000,52.6465}};
      unsigned long intervals[7] = {1000,10000,60000,600000,900000,1800000,3600000};
      

      public :
        
      Setting();
      float getMultiplicadorCelda(int c);
      unsigned long getIntervalo(int pos);
};
