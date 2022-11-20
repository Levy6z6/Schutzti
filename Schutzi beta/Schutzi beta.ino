// #include <Arduino.h>
#include <TinyGPS++.h>
#include <WiFi.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>
#include "GPS.hpp";
#include "DHT11.hpp";
#include "WIFI.hpp"

const int boozer = 23;
const int ledLocate = 22;
 
void setup(){
   pinMode(boozer, OUTPUT);
   pinMode(ledLocate, OUTPUT);
   Serial.begin(9600);
   connectWifi();
   Serial.print("-----------------------------");
}

void loop(){
  getGpsLocation();
  res();
  delay(15000);
 }