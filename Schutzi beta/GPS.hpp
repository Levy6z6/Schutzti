#include<iostream>
#define RXD2 16
#define TXD2 17
HardwareSerial neogps(1);
const int ledLocatePin = 22;
TinyGPSPlus gps;
StaticJsonDocument<560> gpsdoc;
JsonObject GPSLocate = gpsdoc.to<JsonObject>();
const char* GPSipsever = "192.168.100.51";
String warn = "LocationWarming";
int GPSport = 5001;
const String contentTypes = "application/x-www-form-urlencoded";
WiFiClient GPSwifi;
HttpClient GPSclient = HttpClient(GPSwifi, GPSipsever, GPSport);


void getGpsLocation (){
  neogps.begin(9600, SERIAL_8N1, RXD2, TXD2);

    boolean newData = false;
  for (unsigned long start = millis(); millis() - start < 1000;)
  {
    while (neogps.available())
    {
      if (gps.encode(neogps.read()))
      {
        newData = true;
      }
    }
  }

  if(newData == true)
  {
    newData = false;
    Serial.print("Satelites detectados: ");
    Serial.println(gps.satellites.value());
    if (gps.location.isValid() == 1)
  {
    Serial.print("Latitud: ");
    Serial.println(gps.location.lat(),6);
    // double lat = (gps.location.lat(),6);
    // double lon = (gps.location.lng(),6);
    Serial.print("Longitud: ");
    Serial.println(gps.location.lng(),6);
    Serial.print("Velocidad: ");
    Serial.println(gps.speed.kmph());
    Serial.print("Valor del satelite: ");
    Serial.println(gps.satellites.value());
    char jsonOutput[128];
     gpsdoc["latitud"] = (gps.location.lat());
     gpsdoc["longitud"] = (gps.location.lng());
     gpsdoc["speed"] = gps.speed.kmph();
     gpsdoc["id_artefacto"] = 2;
     serializeJson(gpsdoc, jsonOutput);
    GPSclient.post("/localizacion", contentTypes, jsonOutput);
    int statusCode = GPSclient.responseStatusCode();
    String response  = GPSclient.responseBody();
    // Serial.println(response +"-----"+"""LocationWarming""");
    if(response == "true"){
      
        digitalWrite(ledLocatePin, HIGH);
    }else {
      digitalWrite(ledLocatePin, LOW);
    }
    GPSclient.stop();
  }
  else
  {
    
    Serial.println("No se detectan mediciones");
  }
  }
  else
  {
    Serial.print("No se detectan datos");
  }
}

