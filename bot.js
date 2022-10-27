const puppeteer = require("puppeteer");
async function scrape(name, message, url) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto(url);
  await page.waitForSelector("div[title='Search input textbox']", {
    timeout: 120000,
  });
  const search = await page.$("div[title='Search input textbox']");
  await search.type(name, { delay: 200 });

  await page.waitForSelector(`span[title='${name}']`);
  const grp = await page.$(`span[title='${name}']`);
  await grp.click();
  await page.waitForSelector(
    " #main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div.p3_M1 > div > div.fd365im1.to2l77zo.bbv8nyr4.mwp4sxku.gfz4du6o.ag5g9lrv > p"
  );
  const type = await page.$(
    "#main > footer > div._2BU3P.tm2tP.copyable-area > div > span:nth-child(2) > div > div._2lMWa > div.p3_M1 > div > div.fd365im1.to2l77zo.bbv8nyr4.mwp4sxku.gfz4du6o.ag5g9lrv > p"
  );
  for (let i = 0; i < 1; i++) {
    await type.type(message, { delay: 200 });
    await page.keyboard.press("Enter");
  }
  console.log("Sucess");
}
scrape("testing", "Sample message", "https://web.whatsapp.com/");
