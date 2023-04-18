export function useElectronAPI(){
  const electronAPI = window.electronAPI;
  return {
    getAppVersion: electronAPI?.getAppVersion,
    quitApp: electronAPI?.quitApp,
    openDevSettings: electronAPI?.openDevSettings,
  }
}
