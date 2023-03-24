void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(7,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int c=analogRead(A5);
  Serial.println(c);
  if(c<500)
  {
    digitalWrite(7,HIGH);
    Serial.println("121 took");
    
    delay(700);
  }
  else
  {
    digitalWrite(7,LOW);
    Serial.println("121 present");
    
    
    delay(700);
  }
}
