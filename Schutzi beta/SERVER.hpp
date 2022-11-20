const char* ipsever = "192.168.100.51";
int port = 5001;
const String contentType = "application/x-www-form-urlencoded";
WiFiClient wifi;

//JSON Configuration
// char jsonOutput[128];
//JSON para temperatura
StaticJsonDocument<560> tempdoc;
JsonObject object = tempdoc.to<JsonObject>();
//para las alertas de temperatura
StaticJsonDocument<560> alertdoc;
JsonObject objectalert = alertdoc.to<JsonObject>();
//JSON para localización
StaticJsonDocument<560> locatedoc;
JsonObject objectlocate = locatedoc.to<JsonObject>();
//JSON para localización GPS
// StaticJsonDocument<560> gpsdoc;
// JsonObject GPSLocate = gpsdoc.to<JsonObject>();
//Objeto para hacer los request
HttpClient client = HttpClient(wifi, ipsever, port);



String insertTempMedition(float valor){
  char jsonOutput[128];
  tempdoc["valor"]   = valor;
  tempdoc["id_artefacto"] = 2;
  serializeJson(tempdoc, jsonOutput);
  Serial.println("making POST request");
  client.post("/mediciontemperatura", contentType, jsonOutput);
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  if(statusCode == 201){
    Serial.println(response);
  }else{
    Serial.println(response);
  }
  client.stop();
  return response;
}

// Metodo Serialización de las alertas para la temperatura 
String insertWarring(){
  char jsonOutput[128];
  alertdoc["id_artefacto"]   = 2;
  alertdoc["id_alarma"] = 1;
  serializeJson(alertdoc, jsonOutput);
  // Serial.println("making POST request");
  client.post("/alertaartefacto", contentType, jsonOutput);
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  if(statusCode == 201){
    Serial.println(response);
  }else{
    Serial.println(response);
  }
  client.stop();
  return response;
}
