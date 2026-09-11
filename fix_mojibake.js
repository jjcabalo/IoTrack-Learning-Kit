const fs = require('fs');
let code = fs.readFileSync('c:/Users/John Jervys/Downloads/IoTrack-Learning-Kit/src/pages/index.jsx', 'utf8');

// 1. Remove Beginner Friendly and Highly Interactive
code = code.replace(/<div className="flex items-center gap-2 bg-background\/50 backdrop-blur px-4 py-2 rounded-xl border border-border\/50 text-sm font-semibold"><Target className="w-4 h-4 text-brand" \/> Beginner Friendly<\/div>/, '');
code = code.replace(/<div className="flex items-center gap-2 bg-background\/50 backdrop-blur px-4 py-2 rounded-xl border border-border\/50 text-sm font-semibold"><Zap className="w-4 h-4 text-brand" \/> Highly Interactive<\/div>/, '');

// 2. Fix Mojibake everywhere
code = code.replace(/Form â€¢ 5 min/g, 'Form • 5 min');
code = code.replace(/90Â°/g, '90°');
code = code.replace(/âœ“/g, '✓');
code = code.replace(/âœ—/g, '✗');
code = code.replace(/â–■/g, '■');
code = code.replace(/â– /g, '■');
code = code.replace(/â– /g, '■');
code = code.replace(/â†’/g, '→');
code = code.replace(/â€”/g, '—');
code = code.replace(/â€¦/g, '…');

// Extra fixes if powershell produced ? instead of â
code = code.replace(/Form \? 5 min/g, 'Form • 5 min');
code = code.replace(/90A\?/g, '90°');
code = code.replace(/90A/g, '90°');

// Let's also check for generic mojibake that node printed out last time:
code = code.replace(/\?"/g, '—');
code = code.replace(/o"/g, '✓');
code = code.replace(/o-/g, '✗');
code = code.replace(/-\/g, '■');

fs.writeFileSync('c:/Users/John Jervys/Downloads/IoTrack-Learning-Kit/src/pages/index.jsx', code, 'utf8');
