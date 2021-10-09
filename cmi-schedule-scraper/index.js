const puppeteer = require("puppeteer");

const run = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://www.chungbuk.ac.kr/site/www/sub.do?key=1804");

    let data = await page.evaluate(()=>{
        getData: function getData(){
            let data = [];
            let year = document.querySelectorAll(`#contents > div.academic_calendar > ul > li`);
            for(let i = 0; i < list.length; i++){
                let monthData = [];
                let month = year[i].querySelectorAll("div:nth-child(2) > div:nth-child(1) > ul > li");
                for(let j = 0; j < month.length; j++){
                    let date = month[j].querySelector("span").textContent;
                    let content = month[j].textContent;
                    content = content.slice(date.length, content.length - 1);
                    date = date.slice(1, date.length - 1);
                    monthData.push([date, content]);
                }
                data.push(monthData);
            }
            console.log(data)
        }
        return getData();
    })
  } catch (e) {
    console.log(e);
  }
};

run();