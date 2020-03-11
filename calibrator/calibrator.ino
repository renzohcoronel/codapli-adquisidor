/*
 * circuits4you.com
 * 2016 November 25
 * Load Cell HX711 Module Interface with Arduino to measure weight in Kgs
 Arduino 
 pin 
 2 -> HX711 CLK
 3 -> DOUT
 5V -> VCC
 GND -> GND
 
 Most any pin on the Arduino Uno will be compatible with DOUT/CLK.
 The HX711 board can be powered from 2.7V to 5V so the Arduino 5V power should be fine.
*/
 
#include "HX711.h"  //You must have this library in your arduino library folder
 

HX711 celda(A0, A1); 
int sample = 10;
float scale = 7.0f;
//=============================================================================================
//                         SETUP
//=============================================================================================
void setup() {

  Serial.begin(115200);   
  celda.set_scale();
  celda.tare();
}
 
//=============================================================================================
//                         LOOP
//=============================================================================================
void loop() {
   
  Serial.println(abs(celda.get_units(10)));
  if(Serial.available()> 0 ) {
    float pesoMaestro = Serial.parseFloat();
   if(pesoMaestro > 2 ) {
    float error = 1;

  
    while(!(error <= 0.00001)){
      
      float valorLeido = celda.get_value();
      scale = (valorLeido/pesoMaestro);
      celda.set_scale(scale);
      error = abs((pesoMaestro-(valorLeido/scale)))/pesoMaestro;   
    
      Serial.print("Value: ");
      Serial.print(valorLeido);
      Serial.print(" Scale: ");
      Serial.print(scale);
      Serial.print(" Sample : ");
      Serial.print(sample);
      Serial.print(" Error: ");
      Serial.print(error);
      Serial.println();
    
    }    
   } else {
      celda.tare();
    }
  }
  
   
}
//=============================================================================================

