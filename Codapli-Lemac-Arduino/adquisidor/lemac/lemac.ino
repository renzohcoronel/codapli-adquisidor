#include <Arduino.h>
#include <ArduinoJson.h>
#include <HX711.h>
#include <SoftwareSerial.h>
#include "SettingItem.h";
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
SettingItem celdas[3] = {{500,-6561.95},{1000,105.293},{2000,52.6465}};
int settingSelected = 0; 
HX711 celda(A1, A0);
Lvdt *lvdt0;
Lvdt *lvdt1;

// Para manejar el TIME_VALUE que enviamos desde JS
unsigned long  INTERVAL = 1000;
unsigned long previousMillis;


//--------------------------------

SoftwareSerial serialDebug(10, 11); //10:RX; 11:TX 

void setup() {
  serialDebug.begin(115200);
  Serial.begin(115200);   
  lvdt0 = new Lvdt(A2);
  lvdt1 = new Lvdt(A3);
  lvdt0->setTipo(50);
  lvdt1->setTipo(50);
  celda.set_scale(celdas[0].multiplicador);

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
                     float _lvdt0 = jsonData["lvdt0"];
                     float _lvdt1 = jsonData["lvdt1"];                    
                     
      
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
                    settingSelected = jsonData["celda"]; 
                                                          
                    float _scale = celdas[settingSelected].multiplicador;
                    celda.set_scale(_scale);
                    celda.tare();
                    
                   
                    //creacion de objeto JSON
                    JsonObject& root1 = jsonBuffer.createObject();
                    root1["code"] = CODAPLIOK;
                    root1["celda_scale"] = settingSelected;
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
      float celda_value = celda.get_units() *100.00;
      int celda_value_1 = int(celda_value);
      celda_value = celda_value_1 / 100.00;
      root["celdaSet"] = celdas[settingSelected].identificador; 
      root["celdaIndex"] = settingSelected;
      root["lvdt0Set"] = lvdt0->getTipo();
      root["lvdt1Set"] = lvdt1->getTipo();
      root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
      root["lvdt0"] = lvdt0->getValue();
      root["lvdt1"] = lvdt1->getValue();        
      root.printTo(Serial);
      Serial.println();
      
      previousMillis = millis();
   }
  
  

}
