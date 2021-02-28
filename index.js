require("dotenv").config();
const config = require("config");
const playwright = require("playwright");
var Promise = require("bluebird");

(async () => {
  for (const browserType of ["chromium"]) {
    const browser = await playwright[browserType].launch({
      headless: false,
      slowMo: 50,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(config.hilan.pages.loginPage);
    await page.fill("#user_nm", config.hilan.username);
    await page.fill("#password_nm", config.hilan.password);
    await page.click("button");

    // const frames = await page.frames();
    // const newframe = frames[1];
    // const newframehandle = newframe.contentFrame();
    // await newframehandle.click('css=input:text("שמור וסגור")');

    for (i = 0; i < 30; i++) {
      // next page\
      const mainFrame = await page.mainFrame();
      await mainFrame.click(
        `css=.TableContentData >> css=.UserTasksItem:nth-child(${config.startingDayIndex}) >> css=span`
      );
      await Promise.delay(1000);
      const elementHandle = await page.$("#ErrFrame");
      await Promise.delay(1000);
      const frame = await elementHandle.contentFrame();
      await Promise.delay(1000);
      // await frame.click('css=input:text("שמור וסגור")'); // working
      await frame.click(
        "css=tr.gridRowStyle >> css=td.ItemCell:first-child >> css=input"
      );
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("Digit0");
      await page.keyboard.press("Digit9");
      await page.keyboard.press("Digit0");
      await page.keyboard.press("Digit0");
      await page.keyboard.press("Digit1");
      await page.keyboard.press("Digit9");
      await page.keyboard.press("Digit0");
      await page.keyboard.press("Digit0");
      await frame.click('css=input:text("שמור וסגור")'); // working
      await Promise.delay(2000);
      await page.keyboard.press("Enter");
      await Promise.delay(1000);
    }

    // await frame.fill(
    //   "css=tr.gridRowStyle >> css=td.ItemCell:first-child >> css=input",
    //   "0900"
    // );
    console.log("went to page");
    await page.screenshot({ path: `example-${browserType}.png` });
    await browser.close();
  }
})();
