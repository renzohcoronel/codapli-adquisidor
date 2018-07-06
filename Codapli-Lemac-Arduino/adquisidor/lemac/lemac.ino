#include <Arduino.h>
#include <ArduinoJson.h>
#include <HX711.h>
#include "Configuracion.h";

void setup() {
  Serial.begin(115200);   

}

void loop() {
  
   if(Serial.available()){
  
    StaticJsonBuffer<500> jsonBuffer;
    JsonObject& jsonData = jsonBuffer.parse(Serial);  
    
    if (jsonData.success()) {
      int estado = jsonData["estado"];
      switch(estado){               
        case 100: 
                {         
     
                break;
                }
      
        case 200:{
             
              break;
              }  
        default:
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
  Serial.println();
  delay(1000);
  

}
