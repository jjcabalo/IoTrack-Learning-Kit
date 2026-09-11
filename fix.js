const fs = require('fs');
let code = fs.readFileSync('c:/Users/John Jervys/Downloads/IoTrack-Learning-Kit/src/pages/index.jsx', 'utf8');
code = code.replace(/â– /g, '■');
fs.writeFileSync('c:/Users/John Jervys/Downloads/IoTrack-Learning-Kit/src/pages/index.jsx', code, 'utf8');
