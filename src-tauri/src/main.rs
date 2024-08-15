// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

use std::{thread,time};
mod tray;

#[tauri::command]
fn my_custom_command(a: f32, b: f32) ->f32 {
    println!("开始计算");
    let c = a*b;
    println!("值为:{}",c);
    c
}
use tauri::{Manager, Window};

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

// init a background process on the command, and emit periodic events only to the window that used the command
#[tauri::command]
fn init_process(window: Window) {

  println!("到了事件处理方法里面");
  std::thread::spawn(move || 
    loop {
      window.emit("event-name", Payload { message: "Tauri is awesome!".into() }).unwrap();
      thread::sleep(time::Duration::from_millis(500));
    }
  );
}

// Create the command:
// This command must be async so that it doesn't run on the main thread.
#[tauri::command]
async fn close_splashscreen(window: Window) {
  // Close splashscreen
  window.get_window("splashscreen").expect("no window labeled 'splashscreen' found").close().unwrap();
  // Show main window
  window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        // .menu(tauri::Menu::os_default(&context.package_info().name)) //配置界面菜单
        .system_tray(tray::menu()) // ✅ 将 `tauri.conf.json` 上配置的图标添加到系统托盘
        .on_system_tray_event(tray::handler) // ✅ 注册系统托盘事件处理程序
        .invoke_handler(tauri::generate_handler![my_custom_command, init_process,close_splashscreen])
        .run(context)
        .expect("error while running tauri application");
}
