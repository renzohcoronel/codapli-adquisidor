
#include <EEPROM.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <HX711.h>


#define DOUT  A1
#define CLK  A0
#define TIME_TO_REPEAT 1000

#define SETTINGS 100
#define GET_SETTINGS 101
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
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& jsonData = jsonBuffer.parse(Serial);  
    int estado = jsonData["estado"];
    if (jsonData.success()) {
      switch(estado){               
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
        default:
            break;
      }
    }
  }  

/*  StaticJsonBuffer<250> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tipo"] = "datos";
  float celda_value = celda.get_units(5);
  root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
  root["ldvt0"] = ldvt0.getValue();
  root["ldvt1"] = ldvt1.getValue();             
  root.printTo(Serial);*/
  Serial.println();
  delay(1000);
  
}
