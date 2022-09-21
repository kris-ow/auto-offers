import puppeteer from "puppeteer";
import dappeteer from "@chainsafe/dappeteer";
import { price, time, collectionId, items } from "./components/params.js";
import { sleep } from "./components/helper-functions.js";
import { makeOffer } from "./components/make-offer.js";

async function main() {
    const [metamask, page] = await dappeteer.bootstrap(puppeteer, { metamaskVersion: 'v10.15.0', seed: "switch student timber soldier close engage slogan burger pyramid deliver twin coconut", defaultViewport: { width: 1080, height: 1000 }, headless: false });

    // Go to Opensea page
    await page.goto('https://opensea.io/account');
    page.bringToFront();

    // Click Connect Metamask
    const mmButton = await page.$x('//button[contains(.,"MetaMask")]');
    await sleep(2000);
    await mmButton[0].click();

    // Approve connecting Metamask
    await metamask.approve({allAccounts: false});

    await sleep(1000)

    page.bringToFront();

    for (let i = 0; i < items.length; i++) {
      await makeOffer(metamask, page, collectionId, items[i], price[i % price.length], time[i % time.length], i+1);
    }

    console.log("All offers made.")
  }
  
  main();
