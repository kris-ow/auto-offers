import { sleep } from "./helper-functions.js";

export async function makeOffer(metamask, page, collection, item, price, time, counter) {
    await page.goto(`https://opensea.io/assets/ethereum/${collection}/${item}`, {waitUntil: 'load', timeout: 20000});

    try {
      // Click 'Make offer' button
      await sleep(2000);
      const makeOfferButton = await page.$x('//button[contains(.,"Make offer")]');
      await makeOfferButton[0].click();

      // Tick checkbox (input)
      try {
        await sleep(1000);
        const inputCheckbox = await page.$x('//input[contains(@id, "review-confirmation")]');
        await inputCheckbox[0].click();
      } catch(e) {
        //console.log("No checkbox available for clicking.")
      }

      // Click '3 days' to open expiration drop-down
      const expiration = await page.$x('//input[contains(@value, "3 days")]');
      await expiration[0].click();

      // Select time from drop-down
      await sleep(500);
      const setExpiration = await page.$x(`//button[contains(., "1 day")]`);
      await setExpiration[0].click();

      // Select time from calendar
      await sleep(500);
      const calendarButton = await page.$x('//i[contains(@value,"calendar_today")]');
      await calendarButton[0].click();
      
      // Enter time
      await sleep(500);
      const timeInput = await page.$x('//input[contains(@id, "start-time")]');
      await timeInput[0].type(`${time}`);

      // Enter amount
      await sleep(1000);
      const amount = await page.$x('//input[contains(@name, "pricePerUnit")]');
      await amount[0].type(price);

      // Click 'Make offer' button
      const makeOfferButtonFinal = await page.$x('//button[contains(@type, "submit")]');
      await makeOfferButtonFinal[0].click();

      // Approve in MetaMask
      await sleep(3000);

      await metamask.sign();

      await sleep(1000);
      
      console.log(`${counter}. Offer for item #${item} made: ${price}`);
    } catch(e) {
      console.log(`Signing an offer for item #${item} failed.`);
    }
    
    page.bringToFront();
  }
