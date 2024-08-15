import fs from 'fs' // 读取 tauri.conf.json
const tauriConf = JSON.parse(fs.readFileSync('../src-tauri/tauri.conf.json', 'utf8'));
let version = tauriConf.package.version; //更新的版本号

//更新版本号
let versionParts = version.split('.').map(Number);
versionParts[2] += 1;
let newVersion =versionParts.join('.');
// 更新 tauri.conf.json version
tauriConf.package.version = newVersion;
fs.writeFileSync('../src-tauri/tauri.conf.json', JSON.stringify(tauriConf, null, 2));