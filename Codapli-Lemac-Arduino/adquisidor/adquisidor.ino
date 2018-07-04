
#include <EEPROM.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <HX711.h>


#define DOUT  3
#define CLK  2
#define TIME_TO_REPEAT 1000

#define SET_CELDA 100
#define SET_LVDTS 101
#define GET_SETTINGS 103
#define TARE 102
#define SET_SCALE 103
#define SET_RETRASO 104;

HX711 celda(DOUT,CLK);
LDVT ldvt0(A2);
LDVT ldvt1(A3);
Setting setting;

void setup() {
  
    Serial.begin(115200);    
   // celda.set_scale(setting.getCalibration_factor_celda());
   // ldvt0.setConst(setting.getCalibration_factor_ldvt0());
   // ldvt1.setConst(setting.getCalibration_factor_ldvt1());      
  setting = new Settings();
}


void loop() {

  if(Serial.available()){
    Serial.println("data disponible");
    StaticJsonBuffer<500> jsonBuffer;
    JsonObject& jsonData = jsonBuffer.parse(Serial);  
    
    if (jsonData.success()) {
      int estado = jsonData["estado"];
      switch(estado){               
<<<<<<< HEAD
        case SETTINGS: 
                {         
                 int valor = setting.getMultiplicado(idelca);

                 Serial.println(celda , ldv0  ,lvd1 ) ;
                break;
                }
      
        case SET_RETRASO:{
              int Retraso = JsonData["retraso"];
              break;
              }  
=======
        case SET_CELDA: 
                {
               
                float calibration_factor_celda = jsonData["factorCelda"];
         
                celda.set_scale(calibration_factor_celda);
                celda.tare();
       
                          
                setting.setCalibration_factor_celda(calibration_factor_celda);
       
                EEPROM.put(0,setting);
                break;
                }
          case SET_LVDTS: 
                {
               
            
                int calibration_factor_ldvt0 = jsonData["factorLdvt0"];
                int calibration_factor_ldvt1 = jsonData["factorLdvt1"];
   
                ldvt0.setConst(calibration_factor_ldvt0);
                ldvt1.setConst(calibration_factor_ldvt1);

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
                      float celda_value = celda.get_units(3);
                      root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
                      
                      root["factorCelda"] = setting.getCalibration_factor_celda();
                      root["ldvt0"] = ldvt0.getValue();
                      root["factorLdvt0"] = setting.getCalibration_factor_ldvt0();
                      root["ldvt1"] = ldvt1.getValue();
                      root["factorLdvt1"] = setting.getCalibration_factor_ldvt1();
                      root.printTo(Serial);
                      Serial.println();                         
                break;
              }
        case TARE:
              {
                celda.tare();
                StaticJsonBuffer<250> jsonBuffer;
                JsonObject& root = jsonBuffer.createObject();
                root["tipo"] = "tare";
                float celda_value = celda.get_units(3);
                root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
             
                root.printTo(Serial);
                Serial.println();                         
                
               break; 
               }
>>>>>>> 9205e37a672cf323b81cee49d63b2d2e68915f15
        default:
            break;
      }
    } else {
      Serial.println("Json Parser error");
 
      }
  }  

/*  StaticJsonBuffer<250> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tipo"] = "datos";
  float celda_value = celda.get_units(3);
  root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
  root["ldvt0"] = ldvt0.getValue();
  root["ldvt1"] = ldvt1.getValue();             
  root.printTo(Serial);*/
  Serial.println();
  delay(1000);
  
}
