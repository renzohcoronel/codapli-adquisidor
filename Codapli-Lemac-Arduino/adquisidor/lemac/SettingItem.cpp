#include "SettingItem.h"

SettingItem::SettingItem(int id , float m){
      identificador=id;
      multiplicador=m;
}


int SettingItem::getIdentificador(){
  return identificador;
}

float SettingItem::getMultiplicador(){
  return multiplicador;
}
