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

#define DATA_SENSOR_WORK 700
#define DATA_SENSOR_SETTINGS 800

// instanciacion de Objetos y demas variables
Setting *setting;
HX711 celda(A1, A0);
Lvdt *lvdt0;
Lvdt *lvdt1;

// Para manejar el TIME_VALUE que enviamos desde JS
unsigned long  INTERVAL_WORK = 1000;
unsigned long previousMillisWork;

unsigned long  INTERVAL_SETTINGS = 1000;
unsigned long previousMillisSettings;
//--------------------------------

SoftwareSerial serialDebug(10, 11); //10:RX; 11:TX 

void setup() {
  serialDebug.begin(115200);
  Serial.begin(115200);   
  Serial.println("Setup...>");
  setting = new Setting();
  lvdt0 = new Lvdt(A2);
  lvdt1 = new Lvdt(A3);

  // Capturar el primer millis
   previousMillisSettings = millis();
   previousMillisWork = previousMillisSettings;
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
             

       case SET_TMUESTREO:{
             INTERVAL_WORK = setting->getIntervalo(jsonData["time"]);
             JsonObject& root1 = jsonBuffer.createObject();
             root1["code"] = CODAPLIOK;
             root1["time"] = INTERVAL_WORK;
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

  //Vamos a usar esta manera para que no sea un event bloqueando con delay
  // El primero es para enviar el mensaje de lectura de sensores cuando se encuentre 
  // trabajando y registrando el equipo
   unsigned long currentMillis = millis();
   if ((unsigned long)(currentMillis - previousMillisWork) >= INTERVAL_WORK)
   {
      StaticJsonBuffer<250> jsonBuffer;
      JsonObject& root = jsonBuffer.createObject();
      root["code"] = DATA_SENSOR_WORK;
      float celda_value = celda.get_units();
      root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
      root["ldvt0"] = lvdt0->getValue();
      root["ldvt1"] = lvdt1->getValue();     
      root["intervalo"]=INTERVAL_WORK;        
      root.printTo(Serial);
      Serial.println();
      
      previousMillisWork = millis();
   }

  //El segundo es para cuando nos encontramos en settings tener siempre datos actualizados.
   if ((unsigned long)(currentMillis - previousMillisSettings) >= INTERVAL_SETTINGS)
   {
      StaticJsonBuffer<250> jsonBuffer;
      JsonObject& root = jsonBuffer.createObject();
      root["code"] = DATA_SENSOR_SETTINGS;
      float celda_value = celda.get_units();
      root["celda"] = !isnan(celda_value) && !isinf(celda_value) ? celda_value: 0.0f;
      root["ldvt0"] = lvdt0->getValue();
      root["ldvt1"] = lvdt1->getValue();
      root["intervalo"]=INTERVAL_SETTINGS;
      root["intervalo_work"]=INTERVAL_WORK;            
      root.printTo(Serial);
      Serial.println();
      
      previousMillisSettings = millis();
   }
  
  

}
