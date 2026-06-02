const fs = require('fs');
let c = fs.readFileSync('src/components/SmartNotification.tsx', 'utf8');

c = c.replace(
  "if (currentNotif && (currentNotif.type === 'morning' || currentNotif.type === 'evening')) {",
  "if (currentNotif && (currentNotif.type === 'morning' || currentNotif.type === 'evening' || currentNotif.type === 'lunch')) {"
);

c = c.replace(
  "if (notification && (notification.type === 'morning' || notification.type === 'evening')) {",
  "if (notification && (notification.type === 'morning' || notification.type === 'evening' || notification.type === 'lunch')) {"
);

c = c.replace(
  "{(notification.type === 'morning' || notification.type === 'evening') && (",
  "{(notification.type === 'morning' || notification.type === 'evening' || notification.type === 'lunch') && ("
);

c = c.replace(
  "{notification.type === 'morning' ? 'Sudah Masuk Hari Ini' : 'Sudah Absen Pulang'}",
  "{notification.type === 'morning' || notification.type === 'lunch' ? 'Sudah Masuk Hari Ini' : 'Sudah Absen Pulang'}"
);

c = c.replace(
  "{notification.type === 'morning' ? hadirList.length : pulangList.length} Orang",
  "{notification.type === 'morning' || notification.type === 'lunch' ? hadirList.length : pulangList.length} Orang"
);

c = c.replace(
  "!isFetchingAbsen && notification.type === 'morning' && hadirList.length === 0",
  "!isFetchingAbsen && (notification.type === 'morning' || notification.type === 'lunch') && hadirList.length === 0"
);

c = c.replace(
  "{notification.type === 'morning' && hadirList.map((item, i) => (",
  "{(notification.type === 'morning' || notification.type === 'lunch') && hadirList.map((item, i) => ("
);

fs.writeFileSync('src/components/SmartNotification.tsx', c);
console.log('done notification');
