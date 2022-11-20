  // Conexión a internet

  //Credenciales de acceso a la red
const char* ssid = "Totalplay-85A0";
const char* password ="85A01118567y35j7";

/*
Charly:
MEGACABLE-2.4G-67A5
QQ4g7C6yzG
Cesar:
Totalplay-85A0
85A01118567y35j7
Uni:
Torre C Labs
1q2w3e4r5t
*/
 void connectWifi(){

  WiFi.begin(ssid, password);
  Serial.print("Connecting...");
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Wifi conectado con la ip: ");
  Serial.println(WiFi.localIP());
  // setClock();

 } 
