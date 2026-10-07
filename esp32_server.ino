#include <WiFi.h>
#include <WebServer.h>

// ===================== WIFI SETTINGS =====================
const char* ssid = "HUAWEI-2.4G-E8Ev";
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
h1 { font-size: 22px; color: #1a202c; }
h2 { font-size: 18px; margin-top: 30px; color: #2d3748; border-bottom: 2px solid #cbd5e0; padding-bottom: 5px; }
.module { background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
select, button {
display: block;
width: 100%;
max-width: 320px;
margin: 10px auto;
padding: 14px;
font-size: 16px;
border-radius: 8px;
border: 1px solid #cbd5e0;
}
button {
border: none;
background: #3182ce;
color: white;
font-weight: bold;
cursor: pointer;
}
button:active { background: #2b6cb0; }

.terminal-output { 
  margin: 15px auto; 
  padding: 10px; 
  background: #1a202c; 
  color: #48bb78; 
  font-family: monospace; 
  font-size: 14px;
  border-radius: 6px; 
  max-width: 320px; 
  text-align: left;
  min-height: 20px;
}

.challenge-section {
  margin: 15px auto;
  padding: 15px;
  background: #ebf8ff;
  border-left: 4px solid #3182ce;
  border-radius: 6px;
  max-width: 320px;
  text-align: left;
}
.challenge-section h3 { margin: 0 0 10px 0; font-size: 16px; color: #2b6cb0; }
.challenge-section p { margin: 0; font-size: 14px; color: #2d3748; }

.jog-row {
display: flex;
max-width: 320px;
margin: 8px auto;
gap: 10px;
}
.jog-row span {
flex: 1;
font-size: 15px;
align-self: center;
text-align: left;
font-weight: bold;
color: #4a5568;
}
.jog-row button {
flex: 1;
margin: 0;
padding: 12px;
background: #718096;
font-size: 18px;
}
.jog-row button:active { background: #4a5568; }

.step-row {
display: flex;
max-width: 320px;
margin: 10px auto 20px auto;
gap: 10px;
}
.step-row input {
flex: 1;
min-width: 0;
margin: 0;
padding: 12px;
font-size: 16px;
border-radius: 8px;
border: 1px solid #cbd5e0;
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

<div class="module">
<h2>Stack blocks</h2>
<div class="challenge-section">
  <h3>Programming Challenge</h3>
  <p>Stack exactly 3 blocks (Red, Green, and Blue) into Position 1!</p>
</div>
<select id="stack-target">
<option value="number1">Target: Position 1</option>
<option value="number2">Target: Position 2</option>
<option value="number3">Target: Position 3</option>
<option value="number4">Target: Position 4</option>
<option value="number5">Target: Position 5</option>
</select>
<select id="stack-block1">
<option value="red">Block 1: Red</option>
<option value="green">Block 1: Green</option>
<option value="blue">Block 1: Blue</option>
<option value="number1">Block 1: Position 1</option>
<option value="number2">Block 1: Position 2</option>
</select>
<select id="stack-block2">
<option value="">Block 2: None</option>
<option value="red">Block 2: Red</option>
<option value="green">Block 2: Green</option>
<option value="blue" selected>Block 2: Blue</option>
<option value="number1">Block 2: Position 1</option>
<option value="number2">Block 2: Position 2</option>
</select>
<select id="stack-block3">
<option value="">Block 3: None</option>
<option value="red">Block 3: Red</option>
<option value="green" selected>Block 3: Green</option>
<option value="blue">Block 3: Blue</option>
<option value="number1">Block 3: Position 1</option>
<option value="number2">Block 3: Position 2</option>
</select>
<button onclick="sendComplexStack()">Stack</button>
<div id="status-stack" class="terminal-output">Ready</div>
</div>

<div class="module">
<h2>Mix stack (blocks go to different spots)</h2>
<div class="challenge-section">
  <h3>Programming Challenge</h3>
  <p>Move the Red block to Position 2, Green to Position 3, and Blue to Position 4!</p>
</div>
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
<div id="status-mix" class="terminal-output">Ready</div>
</div>

<div class="module">
<h2>Color sorting</h2>
<div class="challenge-section">
  <h3>Programming Challenge</h3>
  <p>Scan and sort exactly 3 blocks using the color sensor.</p>
</div>
<select id="sort-count">
  <option value="1">Sort 1 Block</option>
  <option value="2">Sort 2 Blocks</option>
  <option value="3" selected>Sort 3 Blocks</option>
  <option value="4">Sort 4 Blocks</option>
</select>
<button onclick="sendColorSort()">Color Sort</button>
<div id="status-sort" class="terminal-output">Ready</div>
</div>

<div class="module">
<h2>Manual jog control (<span id="stepLabel">5</span>&deg; per tap)</h2>
<div class="challenge-section">
  <h3>Programming Challenge</h3>
  <p>Manually jog the arm to pick a block from Position 5 and place it in the Red zone.</p>
</div>
<div class="step-row">
<input type="number" id="stepInput" value="5" min="1" max="180" inputmode="numeric">
<button onclick="setStep()">Set angle</button>
</div>
<div class="jog-row">
<span>Base</span>
<button onclick="sendCommand('base -', 'jog')">&minus;</button>
<button onclick="sendCommand('base +', 'jog')">+</button>
</div>
<div class="jog-row">
<span>Shoulder</span>
<button onclick="sendCommand('shoulder -', 'jog')">&minus;</button>
<button onclick="sendCommand('shoulder +', 'jog')">+</button>
</div>
<div class="jog-row">
<span>Elbow</span>
<button onclick="sendCommand('elbow -', 'jog')">&minus;</button>
<button onclick="sendCommand('elbow +', 'jog')">+</button>
</div>
<div class="jog-row">
<span>Claw</span>
<button onclick="sendCommand('claw -', 'jog')">&minus;</button>
<button onclick="sendCommand('claw +', 'jog')">+</button>
</div>
<div id="status-jog" class="terminal-output">Ready</div>
</div>

<script>
function sendComplexStack() {
  const target = document.getElementById('stack-target').value;
  const blocks = ['stack-block1', 'stack-block2', 'stack-block3']
    .map(id => document.getElementById(id).value)
    .filter(v => v !== '');
  sendCommand('cstack ' + target + ' ' + blocks.join(' '), 'stack');
}

function sendMix() {
  const spots = ['mix1', 'mix2', 'mix3']
    .map(id => document.getElementById(id).value)
    .filter(v => v !== '');
  sendCommand('mix ' + spots.join(' '), 'mix');
}

function sendColorSort() {
  const count = document.getElementById('sort-count').value;
  sendCommand('colorsort ' + count, 'sort');
}

function setStep() {
  const deg = parseInt(document.getElementById('stepInput').value, 10);
  if (isNaN(deg) || deg < 1 || deg > 180) {
    document.getElementById('status-jog').innerText = '> Error: Angle must be 1 to 180';
    return;
  }
  document.getElementById('stepLabel').innerText = deg;
  sendCommand('step ' + deg, 'jog');
}

function sendCommand(cmd, module) {
  const statusElement = document.getElementById('status-' + module);
  statusElement.innerText = '> Sending: ' + cmd + '...';
  
  fetch('/cmd?value=' + encodeURIComponent(cmd))
    .then(response => response.text())
    .then(data => {
      statusElement.innerText = '> ' + data;
    })
    .catch(error => {
      statusElement.innerText = '> Error communicating with robot';
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
String cmd = server.arg("value");

unoSerial.println(cmd); // forward exactly as-is to the Uno
Serial.print("Sent to Uno: ");
Serial.println(cmd);

server.send(200, "text/plain", "Command sent: " + cmd);
} else {
server.send(400, "text/plain", "Missing command value");
}
}

// ===================== SETUP =====================
void setup() {
Serial.begin(115200); // USB debug console
unoSerial.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17, matches Uno's Serial.begin(9600)

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
