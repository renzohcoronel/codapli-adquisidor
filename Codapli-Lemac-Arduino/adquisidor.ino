#include <EEPROM.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <HX711.h>
#include "Setting.h"
#include "LDVT.h"

#define DOUT  A1
#define CLK  A0

enum Estado {
  DETENIDO,TRABAJANDO, CONFIGURACION
  
} estado;

HX711 celda(DOUT,CLK);
LDVT ldvt0(A2);
LDVT ldvt1(A3);
Setting setting;

void setup() {
  
    Serial.begin(115200);
    Serial.println("Run..."); 
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
    
    switch(estado){
      case TRABAJANDO:

            celda.tare();
            while(estado == TRABAJANDO){
                  if(Serial.available()){
                      StaticJsonBuffer<200> jsonBuffer;
                      JsonObject& jsonData = jsonBuffer.parse(Serial);

                      estado = jsonData["estado"];
                  
                  } else {
                        StaticJsonBuffer<250> jsonBuffer;
                        JsonObject& root = jsonBuffer.createObject();
                        root["estado"] = TRABAJANDO;
                        root["celda"] = celda.get_units(5);
                        root["ldvt0"] = ldvt0.getValue();
                        root["ldvt1"] = ldvt1.getValue();
                        
                        root.printTo(Serial);
                        delay(1000);     
                    
                  }
                
            }

          break;
      case CONFIGURACION:
                  celda.set_scale();
                  while(estado == CONFIGURACION){
                  if(Serial.available()){
                      StaticJsonBuffer<200> jsonBuffer;
                      JsonObject& jsonData = jsonBuffer.parse(Serial);
                      if (jsonData.success()) {
                        
                        estado = jsonData["estado"];
                      
                        float calibration_factor_celda = jsonData["calibration_factor_celda"]; // factor = valorLeidoSinEscala / peso Real
                        int calibration_factor_ldvt0 = jsonData["calibration_factor_ldvt0"];
                        int calibration_factor_ldvt1 = jsonData["calibration_factor_ldvt1"];
                        celda.set_scale(calibration_factor_celda);
                        ldvt0.setConst(calibration_factor_ldvt0);
                        ldvt1.setConst(calibration_factor_ldvt1);
                        
                        setting.setCalibration_factor_celda(calibration_factor_celda);
                        setting.setCalibration_factor_ldvt0(calibration_factor_ldvt0);
                        setting.setCalibration_factor_ldvt1(calibration_factor_ldvt1);
                        
                      } else {
                        
                        StaticJsonBuffer<250> jsonBuffer;
                        JsonObject& root = jsonBuffer.createObject();
                        root["error"] = "Error parsing JSON in configuration";
                        root.printTo(Serial);  
                      
                      }
                 
                  } else {
                        StaticJsonBuffer<250> jsonBuffer;
                        JsonObject& root = jsonBuffer.createObject();

                        root["estado"] = CONFIGURACION;
                        root["celda"] = celda.get_units();
                        root["calibration_factor_celda"] = setting.getCalibration_factor_celda();
                        root["ldvt0"] = ldvt0.getValue();
                        root["calibration_factor_ldvt0"] = setting.getCalibration_factor_ldvt0();
                        root["ldvt1"] = ldvt1.getValue();
                        root["calibration_factor_ldvt1"] = setting.getCalibration_factor_ldvt1();
                        root.printTo(Serial);                  
                    
                  }                        
                  delay(200);            
            }
          EEPROM.put(0,setting);
          break;
      default:
          estado=DETENIDO;
          break;
   
      }
  }
}
