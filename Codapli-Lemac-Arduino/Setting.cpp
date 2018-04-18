#include "Setting.h"

Setting::Setting(){
};

void Setting::setCalibration_factor_celda(float factor = 1.0f){
       calibration_factor_celda = factor;  
};

float Setting::getCalibration_factor_celda(){
        return calibration_factor_celda;
};

void Setting::setCalibration_factor_ldvt0(int value){
        calibration_factor_ldvt0 = value;
  };
  
int Setting::getCalibration_factor_ldvt0(){
    return calibration_factor_ldvt0;
  };
  
void Setting::setCalibration_factor_ldvt1(int value){
    calibration_factor_ldvt1 = value;
  };
  
int Setting::getCalibration_factor_ldvt1(){
    return calibration_factor_ldvt1;
  };
