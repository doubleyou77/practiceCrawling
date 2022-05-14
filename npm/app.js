const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async (keyword) => {
  try {
    return await axios.get("https://www.npmjs.com/search?q=" + encodeURI(keyword));
  } catch(err) {
    console.error(err);
  }
}

const parsing = async (keyword) => {
  const html = await getHTML(keyword);
  const $ = cheerio.load(html.data);
  const $courseList = $("._0d2164ff")
  
  //console.dir($courseList)
  
  let courses = [];
  $courseList.each((idx, node) => {
    courses.push({
      title: $(node).find(".db7ee1ac:eq(0)").text(),      
      author: $(node).find("._045facde").text()
    })
  })
  console.log(courses);
}

parsing("express");

