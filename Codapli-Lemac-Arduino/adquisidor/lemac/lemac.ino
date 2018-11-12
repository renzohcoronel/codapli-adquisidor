#include <Arduino.h>
#include <ArduinoJson.h>
#include <HX711.h>
#include <SoftwareSerial.h>
#include "Setting.h";
#include "Lvdt.h";


// Define constantes

#define SET_LDVTS 200
#define SET_CELDA 300
#define SET_TARA 301
#define SET_TMUESTREO 400
#define CODAPLIERROR 500
#define CODAPLIOK 500

#define DATA_SENSOR 700


// instanciacion de Objetos y demas variables
Setting *setting;
HX711 celda(A1, A0);
Lvdt *lvdt0;
Lvdt *lvdt1;

// Para manejar el TIME_VALUE que enviamos desde JS
unsigned long  INTERVAL = 1000;
unsigned long previousMillis;


//--------------------------------

SoftwareSerial serialDebug(10, 11); //10:RX; 11:TX 

void setup() {
  analogReference(EXTERNAL);
  serialDebug.begin(115200);
  Serial.begin(115200);   
  setting = new Setting();
  lvdt0 = new Lvdt(A2);
  lvdt1 = new Lvdt(A3);

  // Capturar el primer millis
   previousMillis = millis();
}

void loop() {
  
   if(Serial.available()){
  
    StaticJsonBuffer<500> jsonBuffer;
    JsonObject& jsonData = jsonBuffer.parse(Serial);  
    
    if (jsonData.success()) {
      int code = jsonData["code"];
      serialDebug.println("Recibi un codigo");
      switch(code){               
        case SET_LDVTS:{
                     int _lvdt0 = jsonData["lvdt0"];
                     int _lvdt1 = jsonData["lvdt1"];                    
                     
      
                    lvdt0->setTipo(_lvdt0);
                    lvdt1->setTipo(_lvdt1);
                    
                    //creacion de objeto JSON
                    JsonObject& root1 = jsonBuffer.createObject();
                    root1["code"] = CODAPLIOK;
                    root1["lvdt0_tipo"] = _lvdt0;
                    root1["lvdt1_tipo"] = _lvdt1;
                    root1.printTo(Serial);
                    Serial.println();
               
                break;
        } 
      
        case SET_CELDA:
             {
                    int _celda = jsonData["celda"]; 
                                                          
                    float _scale = setting->getMultiplicadorCelda(_celda);
                    //celda.set_scale(1);
                    celda.set_scale(_scale);
                    celda.tare();
                    
                   
                    //creacion de objeto JSON
                    JsonObject& root1 = jsonBuffer.createObject();
                    root1["code"] = CODAPLIOK;
                    root1["celda_scale"] = _celda;
                    root1["celda_value"] = celda.get_units();
                    root1.printTo(Serial);
                    Serial.println();
               
                break;
        }
        case SET_TARA: {
                    celda.tare();
                    //creacion de objeto JSON
                    JsonObject& root1 = jsonBuffer.createObject();
                    root1["code"] = CODAPLIOK;
                    root1["celda_value"] = celda.get_units();
                    root1.printTo(Serial);
                    Serial.println();
             
              break;
          }
             
       default:
          JsonObject& root = jsonBuffer.createObject();
          root["code"] = CODAPLIERROR;
          root["message"] = "El code del mensaje es incorrecto";
          root.printTo(Serial);
          Serial.println();
            
        break;
                   
      }
    } else {
          JsonObject& root = jsonBuffer.createObject();
          root["code"] = CODAPLIERROR;
          root["message"] = "JSON PARSER error";
          root.printTo(Serial);
          Serial.println();
 
      }
  } 

   unsigned long currentMillis = millis();
  
   if ((unsigned long)(currentMillis - previousMillis) >= INTERVAL)
   {
      StaticJsonBuffer<250> jsonBuffer;
      JsonObject& root = jsonBuffer.createObject();
      root["code"] = DATA_SENSOR;
      float celda_value = celda.get_units();
      root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
      root["lvdt0"] = lvdt0->getValue();
      root["lvdt1"] = lvdt1->getValue();
      root["intervalo"]=INTERVAL;          
      root.printTo(Serial);
      Serial.println();
      
      previousMillis = millis();
   }
  
  

}
