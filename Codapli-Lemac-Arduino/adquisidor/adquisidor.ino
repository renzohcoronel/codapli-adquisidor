#include <EEPROM.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <HX711.h>
#include "Setting.h"
#include "LDVT.h"

#define DOUT  A1
#define CLK  A0
#define TIME_TO_REPEAT 1000

#define SETTINGS 100
#define GET_SETTINGS 101
#define TARE 102
#define SET_SCALE 103

HX711 celda(DOUT,CLK);
LDVT ldvt0(A2);
LDVT ldvt1(A3);
Setting setting;

void setup() {
  
    Serial.begin(115200);
    EEPROM.get(0,setting);
    
    celda.set_scale(setting.getCalibration_factor_celda());
    ldvt0.setConst(setting.getCalibration_factor_ldvt0());
    ldvt1.setConst(setting.getCalibration_factor_ldvt1());      
  
}

void loop() {

  if(Serial.available()){
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& jsonData = jsonBuffer.parse(Serial);  
    int estado = jsonData["estado"];
    if (jsonData.success()) {
      switch(estado){               
        case SETTINGS: 
                {         
                float calibration_factor_celda = jsonData["calibration_factor_celda"]; // factor = valorLeidoSinEscala / peso Real
                int calibration_factor_ldvt0 = jsonData["calibration_factor_ldvt0"];
                int calibration_factor_ldvt1 = jsonData["calibration_factor_ldvt1"];
                celda.set_scale(calibration_factor_celda);
                ldvt0.setConst(calibration_factor_ldvt0);
                ldvt1.setConst(calibration_factor_ldvt1);
                          
                setting.setCalibration_factor_celda(calibration_factor_celda);
                setting.setCalibration_factor_ldvt0(calibration_factor_ldvt0);
                setting.setCalibration_factor_ldvt1(calibration_factor_ldvt1);
                EEPROM.put(0,setting);
                break;
                }
       case GET_SETTINGS:
              {
                      StaticJsonBuffer<250> jsonBuffer;
                      JsonObject& root = jsonBuffer.createObject();
                      root["tipo"] = "setting";
                      float celda_value = celda.get_units(5);
                      root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
                      
                      root["calibration_factor_celda"] = setting.getCalibration_factor_celda();
                      root["ldvt0"] = ldvt0.getValue();
                      root["calibration_factor_ldvt0"] = setting.getCalibration_factor_ldvt0();
                      root["ldvt1"] = ldvt1.getValue();
                      root["calibration_factor_ldvt1"] = setting.getCalibration_factor_ldvt1();
                      root.printTo(Serial);
                      Serial.println();                         
                break;
              }
        case TARE:
              {
               celda.tare(); 
               break; 
               }
        default:
            break;
      }
    }
  }  

  StaticJsonBuffer<250> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tipo"] = "datos";
  float celda_value = celda.get_units(5);
  root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
  root["ldvt0"] = ldvt0.getValue();
  root["ldvt1"] = ldvt1.getValue();             
  root.printTo(Serial);
  Serial.println();
  delay(500);
  
}
