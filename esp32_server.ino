#include <WiFi.h>
#include <WebServer.h>

// ESP32 connects here via UART1: pin 12 = RX (from ESP32 TX), pin 13 = TX (to ESP32 RX via divider)
HardwareSerial espSerial(1);

// ===================== WIFI SETTINGS =====================
const char* ssid     = "HUAWEI-2.4G-E8Ev";
const char* password = "njDQ6K5x";

// ===================== SERIAL LINK TO UNO =====================
// GPIO16 = RX (receives from Uno TX, through the voltage divider)
// GPIO17 = TX (sends to Uno RX, direct wire)
HardwareSerial unoSerial(2);

WebServer server(80);

// ===================== WEBPAGE =====================
const char htmlPage[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <title>Robotic Arm Control</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: sans-serif; text-align: center; padding: 20px; background: #f2f2f2; }
    h1 { font-size: 20px; }
    h2 { font-size: 15px; margin-top: 24px; color: #333; }
    select, button {
      display: block;
      width: 90%;
      max-width: 300px;
      margin: 10px auto;
      padding: 14px;
      font-size: 17px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }
    button {
      border: none;
      background: #2b6cb0;
      color: white;
    }
    button:active { background: #1a4971; }
    #status { margin-top: 20px; color: #444; }
  </style>
</head>
<body>
  <h1>Robotic Arm Control</h1>

  <h2>Stack blocks</h2>
  <select id="location">
    <option value="number1">Position 1</option>
    <option value="number2">Position 2</option>
    <option value="number3">Position 3</option>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </select>
  <select id="count">
    <option value="1">1 block</option>
    <option value="2">2 blocks</option>
    <option value="3" selected>3 blocks</option>
  </select>
  <button onclick="sendStack()">Stack</button>

  <h2>Color sorting</h2>
  <button onclick="sendCommand('sort')">Sort (1 block each: red/green/blue)</button>

  <div id="status">Ready</div>

  <script>
    function sendStack() {
      const location = document.getElementById('location').value;
      const count = document.getElementById('count').value;
      sendCommand('stack ' + location + ' ' + count);
    }

    function sendCommand(cmd) {
      document.getElementById('status').innerText = 'Sending: ' + cmd + '...';
      fetch('/cmd?value=' + encodeURIComponent(cmd))
        .then(response => response.text())
        .then(data => {
          document.getElementById('status').innerText = data;
        })
        .catch(error => {
          document.getElementById('status').innerText = 'Error sending command';
        });
    }
  </script>
</body>
</html>
)rawliteral";

// ===================== HANDLERS =====================
void handleRoot() {
  server.send(200, "text/html", htmlPage);
}

void handleCommand() {
  if (server.hasArg("value")) {
    String cmd = server.arg("value");   // e.g. "stack number1 3" or "sort"

    unoSerial.println(cmd);   // forward exactly as-is to the Uno
    Serial.print("Sent to Uno: ");
    Serial.println(cmd);

    server.send(200, "text/plain", "Command sent: " + cmd);
  } else {
    server.send(400, "text/plain", "Missing command value");
  }
}

// ===================== SETUP =====================
void setup() {
  Serial.begin(115200);                        // USB debug console
  unoSerial.begin(9600, SERIAL_8N1, 16, 17);   // RX=16, TX=17, matches Uno's Serial.begin(9600)

  espSerial.begin(9600, SERIAL_8N1, 12, 13);   // RX=12, TX=13
  Serial.println("Listening for commands from ESP32 on pins 12/13...");

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/cmd", handleCommand);
  server.begin();
  Serial.println("Web server started.");
}

// ===================== MAIN LOOP =====================
void loop() {
  if (espSerial.available()) {
    String command = espSerial.readStringUntil('\n');
    command.trim();
    command.toLowerCase();

    // ... rest of your existing command parsing stays exactly the same
  }
  server.handleClient();
}
