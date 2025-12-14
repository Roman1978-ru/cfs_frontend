import { install } from '@puppeteer/browsers';
import puppeteer from 'puppeteer-core';
import { join } from 'path';
// Chromium revision 929513 соответствует Chrome 96
const CHROMIUM_REVISION = '929513';
const CACHE_DIR = join(process.cwd(), '.chrome-cache');
async function launchChrome96() {
  console.log('🚀 Запуск Chromium 96...\n');
  let executablePath;
  try {
    // Проверяем, установлен ли уже Chromium 96
    const installResult = await install({
      browser: 'chromium',
      buildId: CHROMIUM_REVISION,
      cacheDir: CACHE_DIR,
    });
    executablePath = installResult.executablePath;
    console.log('✅ Chromium 96 готов:', executablePath, '\n');
  } catch (error) {
    console.error('❌ Ошибка при установке Chromium 96:', error);
    process.exit(1);
  }
  // Запускаем браузер
  try {
    const browser = await puppeteer.launch({
      executablePath,
      headless: false,
      defaultViewport: null,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--start-maximized',
        '--disable-blink-features=AutomationControlled',
      ],
    });
    const pages = await browser.pages();
    const page = pages[0] || await browser.newPage();
    console.log('🌐 Открываю http://localhost:5173/\n');
    await page.goto('http://localhost:5173/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    console.log('✨ Готово! Chromium 96 запущен с вашим сайтом.');
    console.log('ℹ️  Закройте браузер, когда закончите работу.\n');
    // Ждем закрытия браузера
    await new Promise((resolve) => {
      browser.on('disconnected', resolve);
    });
    console.log('👋 Браузер закрыт.');
  } catch (error) {
    console.error('❌ Ошибка при запуске браузера:', error);
    process.exit(1);
  }
}
launchChrome96().catch(console.error);
