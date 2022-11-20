#include "esp32-hal-gpio.h"
#include "DHT.h"
#include "SERVER.hpp"
#define DHTPIN 4
#define DHTTYPE DHT11
const int boozerPin = 23;
DHT dht(DHTPIN, DHTTYPE);



double res() {
  //Pruebas
dht.begin();
delay(6000); 
double temperatura = dht.readTemperature();
if ( isnan(temperatura)) {
Serial.println(F("Failed to read from DHT sensor!"));
return 0;

}
Serial.print("Temperatura: ");
Serial.print(temperatura);
Serial.println("°C ");
insertTempMedition(temperatura);
//Parte del boozer
if(temperatura > 20){
  digitalWrite(boozerPin, HIGH);
  insertWarring();
}else{
  digitalWrite(boozerPin, LOW);
}

return temperatura;

}
