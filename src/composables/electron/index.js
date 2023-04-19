import { getVersion } from '@tauri-apps/api/app';
import { exit } from '@tauri-apps/api/process';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';

export function useElectronAPI() {
  const electronAPI = window.electronAPI;
  return {
    getAppVersion: getVersion,
    quitApp: exit,
    openDevSettings: electronAPI?.openDevSettings,
  }
}


async function checkUpdateFromServer() {
  const update = await checkUpdate();
  if (update.shouldUpdate) {
    console.log(`Installing update ${update.manifest?.version}, ${update.manifest?.date}, ${update.manifest.body}`);
    await installUpdate();
  }
}
//每小时检查更新
setInterval(checkUpdateFromServer, 60 * 1000 * 1000);
