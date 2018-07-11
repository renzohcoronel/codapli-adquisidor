#include <Arduino.h>
#include <ArduinoJson.h>
#include <HX711.h>
#include "Setting.h";

#define SET_LDVTS 200
#define SET_CELDA 300
#define SET_TARA 301
#define SET_TMUESTREO 400
#define CODAPLIERROR 500



void setup() {
  Serial.begin(115200);   

}

void loop() {
  
   if(Serial.available()){
  
    StaticJsonBuffer<500> jsonBuffer;
    JsonObject& jsonData = jsonBuffer.parse(Serial);  
    
    if (jsonData.success()) {
      int code = jsonData["code"];
      
      switch(code){               
        case SET_LDVTS:
                    Serial.println("Mensaje de Set lvdts");
     
                break;
                
      
        case SET_CELDA:
             Serial.println("Mensaje de Set Celda");
              break;

        case SET_TARA:
             Serial.println("Mensaje de Set Tara");
              break;

       case SET_TMUESTREO:
             Serial.println("Mensaje de Set Tiempo Muestreo");
              break;

        default:
          JsonObject& root = jsonBuffer.createObject();
          root["code"] = CODAPLIERROR;
          root["message"] = "El code del mensaje es incorrecto";
          root.printTo(Serial);
          Serial.println();
            
        break;
                   
      }
    } else {
      Serial.println("Json Parser error");
 
      }
  }  

/* StaticJsonBuffer<250> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tipo"] = "datos";
  float celda_value = celda.get_units(3);
  root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
  root["ldvt0"] = ldvt0.getValue();
  root["ldvt1"] = ldvt1.getValue();             
  root.printTo(Serial);*/
  delay(100);
  

}
