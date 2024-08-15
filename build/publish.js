import fs from 'fs'
// 读取 tauri.conf.json
const tauriConf = JSON.parse(fs.readFileSync('../src-tauri/tauri.conf.json', 'utf8'));
let newVersion = tauriConf.package.version; //更新的版本号

// 读取 update.json
let updateJson = JSON.parse(fs.readFileSync('update.json', 'utf8'));
// 更新 update.json version
updateJson.version = newVersion;

//获取版本更新的内容
//签名、版本路径、发版日期
const signature =  fs.readFileSync(`../src-tauri/target/release/bundle/msi/kestrel-task_${newVersion}_x64_zh-CN.msi.zip.sig`, 'utf8');
updateJson.platforms['windows-x86_64'].signature = signature;
updateJson.platforms['windows-x86_64'].url = `https://kestrel-task.cn/kestrel-task_${newVersion}_x64_zh-CN.msi.zip`
updateJson.pub_date = new Date();
fs.writeFileSync('update.json', JSON.stringify(updateJson, null, 2));
