#include <WiFi.h>
#include <WebServer.h>

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

    .jog-row {
      display: flex;
      max-width: 300px;
      margin: 6px auto;
      gap: 8px;
    }
    .jog-row span {
      flex: 1;
      font-size: 15px;
      align-self: center;
      text-align: left;
      padding-left: 4px;
    }
    .jog-row button {
      flex: 1;
      margin: 0;
      padding: 12px;
      background: #4a5568;
    }
    .jog-row button:active { background: #2d3748; }

    .angle-row {
      display: flex;
      max-width: 300px;
      margin: 6px auto;
      gap: 8px;
    }
    .angle-row span {
      flex: 1.2;
      font-size: 15px;
      align-self: center;
      text-align: left;
      padding-left: 4px;
    }
    .angle-row input {
      flex: 2.3;
      min-width: 0;
      margin: 0;
      padding: 12px;
      font-size: 17px;
      border-radius: 8px;
      border: 1px solid #ccc;
      text-align: center;
    }
    .angle-row button {
      flex: 1;
      margin: 0;
      padding: 12px;
    }

    .step-row {
      display: flex;
      max-width: 300px;
      margin: 6px auto 14px auto;
      gap: 8px;
    }
    .step-row input {
      flex: 1;
      min-width: 0;
      margin: 0;
      padding: 12px;
      font-size: 17px;
      border-radius: 8px;
      border: 1px solid #ccc;
      text-align: center;
    }
    .step-row button {
      flex: 1;
      margin: 0;
      padding: 12px;
    }
  </style>
</head>
<body>
  <h1>Robotic Arm Control</h1>

  <h2>Stack blocks</h2>
  <select id="location">
    <option value="number1">Position 1</option>
    <option value="number2">Position 2</option>
    <option value="number3">Position 3</option>
    <option value="number4">Position 4</option>
    <option value="number5">Position 5</option>
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

  <h2>Mix stack (blocks go to different spots)</h2>
  <select id="mix1">
    <option value="number1">Block 1: Position 1</option>
    <option value="number2">Block 1: Position 2</option>
    <option value="number3">Block 1: Position 3</option>
    <option value="number4">Block 1: Position 4</option>
    <option value="number5">Block 1: Position 5</option>
    <option value="red">Block 1: Red</option>
    <option value="green">Block 1: Green</option>
    <option value="blue">Block 1: Blue</option>
  </select>
  <select id="mix2">
    <option value="">Block 2: none</option>
    <option value="number1">Block 2: Position 1</option>
    <option value="number2">Block 2: Position 2</option>
    <option value="number3">Block 2: Position 3</option>
    <option value="number4">Block 2: Position 4</option>
    <option value="number5">Block 2: Position 5</option>
    <option value="red">Block 2: Red</option>
    <option value="green">Block 2: Green</option>
    <option value="blue">Block 2: Blue</option>
  </select>
  <select id="mix3">
    <option value="">Block 3: none</option>
    <option value="number1">Block 3: Position 1</option>
    <option value="number2">Block 3: Position 2</option>
    <option value="number3">Block 3: Position 3</option>
    <option value="number4">Block 3: Position 4</option>
    <option value="number5">Block 3: Position 5</option>
    <option value="red">Block 3: Red</option>
    <option value="green">Block 3: Green</option>
    <option value="blue">Block 3: Blue</option>
  </select>
  <button onclick="sendMix()">Mix Stack</button>

  <h2>Color sorting</h2>
  <button onclick="sendCommand('colorsort')">Color Sort (scans block, sorts 1)</button>

  <h2>Manual jog control (<span id="stepLabel">5</span>&deg; per tap)</h2>
  <div class="step-row">
    <input type="number" id="stepInput" value="5" min="1" max="180" inputmode="numeric">
    <button onclick="setStep()">Set angle</button>
  </div>
  <div class="jog-row">
    <span>Base</span>
    <button onclick="sendCommand('base -')">&minus;</button>
    <button onclick="sendCommand('base +')">+</button>
  </div>
  <div class="jog-row">
    <span>Shoulder</span>
    <button onclick="sendCommand('shoulder -')">&minus;</button>
    <button onclick="sendCommand('shoulder +')">+</button>
  </div>
  <div class="jog-row">
    <span>Elbow</span>
    <button onclick="sendCommand('elbow -')">&minus;</button>
    <button onclick="sendCommand('elbow +')">+</button>
  </div>
  <div class="jog-row">
    <span>Claw</span>
    <button onclick="sendCommand('claw -')">&minus;</button>
    <button onclick="sendCommand('claw +')">+</button>
  </div>

  <h2>Set exact angles (degrees)</h2>
  <div class="angle-row">
    <span>Base</span>
    <input type="number" id="angleBase" placeholder="0-180" min="0" max="180" inputmode="numeric">
  </div>
  <div class="angle-row">
    <span>Shoulder</span>
    <input type="number" id="angleShoulder" placeholder="60-145" min="60" max="145" inputmode="numeric">
  </div>
  <div class="angle-row">
    <span>Elbow</span>
    <input type="number" id="angleElbow" placeholder="60-145" min="60" max="145" inputmode="numeric">
  </div>
  <div class="angle-row">
    <span>Claw</span>
    <input type="number" id="angleClaw" placeholder="116-145" min="116" max="145" inputmode="numeric">
  </div>
  <button onclick="sendAllAngles()">Move to angles</button>

  <div id="status">Ready</div>

  <script>
    function sendStack() {
      const location = document.getElementById('location').value;
      const count = document.getElementById('count').value;
      sendCommand('stack ' + location + ' ' + count);
    }

    // Builds e.g. 'mix number1 number2 number1' from the three dropdowns.
    // Blocks set to "none" are skipped; a repeated spot stacks on top.
    function sendMix() {
      const spots = ['mix1', 'mix2', 'mix3']
        .map(id => document.getElementById(id).value)
        .filter(v => v !== '');
      sendCommand('mix ' + spots.join(' '));
    }

    // Sets the jog angle used by ALL joints (sends 'step <deg>' to the Uno)
    function setStep() {
      const deg = parseInt(document.getElementById('stepInput').value, 10);
      if (isNaN(deg) || deg < 1 || deg > 180) {
        document.getElementById('status').innerText = 'Angle must be 1 to 180';
        return;
      }
      document.getElementById('stepLabel').innerText = deg;
      sendCommand('step ' + deg);
    }

    // Sends ONE command, e.g. 'angles 90 100 120 130', to move all four joints.
    // Any box left empty is sent as '-' so that joint stays where it is.
    // Values are range-checked here first so bad values never leave the page.
    function sendAllAngles() {
      const joints = [
        { name: 'Base',     id: 'angleBase',     min: 0,   max: 180 },
        { name: 'Shoulder', id: 'angleShoulder', min: 60,  max: 145 },
        { name: 'Elbow',    id: 'angleElbow',    min: 60,  max: 145 },
        { name: 'Claw',     id: 'angleClaw',     min: 116, max: 145 }
      ];

      const parts = [];
      for (const j of joints) {
        const raw = document.getElementById(j.id).value.trim();
        if (raw === '') {
          parts.push('-');
          continue;
        }
        const deg = Number(raw);
        if (!Number.isInteger(deg) || deg < j.min || deg > j.max) {
          document.getElementById('status').innerText =
            j.name + ' angle must be ' + j.min + ' to ' + j.max;
          return;
        }
        parts.push(String(deg));
      }

      if (parts.every(p => p === '-')) {
        document.getElementById('status').innerText = 'Enter at least one angle';
        return;
      }
      sendCommand('angles ' + parts.join(' '));
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
    String cmd = server.arg("value");   // e.g. "stack number1 3", "sort", "colorsort", "elbow +", "step 10", "angles 90 100 120 130"

    unoSerial.println(cmd);   // forward exactly as-is to the Uno
    Serial.print("Sent to Uno: ");
    Serial.println(cmd);

    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "text/plain", "Command sent: " + cmd);
  } else {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(400, "text/plain", "Missing command value");
  }
}

// ===================== SETUP =====================
void setup() {
  Serial.begin(115200);                        // USB debug console
  unoSerial.begin(9600, SERIAL_8N1, 16, 17);   // RX=16, TX=17, matches Uno's Serial.begin(9600)

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
  server.handleClient();
}
