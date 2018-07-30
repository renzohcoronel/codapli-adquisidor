#include <Arduino.h>
#include <ArduinoJson.h>
#include <HX711.h>
#include "Setting.h";
#include "Lvdt.h";


// Define constantes

#define SET_LDVTS 200
#define SET_CELDA 300
#define SET_TARA 301
#define SET_TMUESTREO 400
#define CODAPLIERROR 500
#define CODAPLIOK 500

// instanciacion de Objetos y demas variables
Setting *setting;
HX711 celda(2, 3);
Lvdt *lvdt0;
Lvdt *lvdt1;


void setup() {
  Serial.begin(115200);   
  setting = new Setting();
  lvdt0 = new Lvdt(A4);
  lvdt1 = new Lvdt(A5);
}

void loop() {
  
   if(Serial.available()){
  
    StaticJsonBuffer<500> jsonBuffer;
    JsonObject& jsonData = jsonBuffer.parse(Serial);  
    
    if (jsonData.success()) {
      int code = jsonData["code"];
      
      switch(code){               
        case SET_LDVTS:{
                     int _lvdt0 = jsonData["lvdt0"];
                     int _lvdt1 = jsonData["lvdt1"];                    
                     
                    float m0 = setting->getMultiplicadorLvdt(_lvdt0);
                    float m1 = setting->getMultiplicadorLvdt(_lvdt1);

                    lvdt0->setConstante(m0);
                    lvdt1->setConstante(m1);
                    
                    //creacion de objeto JSON
                    JsonObject& root1 = jsonBuffer.createObject();
                    root1["code"] = CODAPLIOK;
                    root1["lvdt0_multiplicador"] = m0;
                    root1["lvdt1_multiplicador"] = m1;
                    root1.printTo(Serial);
                    Serial.println();
               
                break;
        } 
      
        case SET_CELDA:
             {
                    int _celda = jsonData["celda"];                                       
                    float _scale = setting->getMultiplicadorCelda(_celda);

                    celda.set_scale(_scale);
                    celda.tare(20);
                    
                    //creacion de objeto JSON
                    JsonObject& root1 = jsonBuffer.createObject();
                    root1["code"] = CODAPLIOK;
                    root1["celda_scale"] = _celda;
                    root1["celda_value"] = celda.get_units(20);
                    root1.printTo(Serial);
                    Serial.println();
               
                break;
        }
        case SET_TARA: {
                    celda.tare(20);
                    //creacion de objeto JSON
                    JsonObject& root1 = jsonBuffer.createObject();
                    root1["code"] = CODAPLIOK;
                    root1["celda_value"] = celda.get_units(20);
                    root1.printTo(Serial);
                    Serial.println();
             
              break;
          }
             

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

  StaticJsonBuffer<250> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tipo"] = "datos";
  float celda_value = celda.get_units(20);
  root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
  root["ldvt0"] = lvdt0->getValue();
  root["ldvt1"] = lvdt1->getValue();             
  root.printTo(Serial);
  delay(1000);
  

}
