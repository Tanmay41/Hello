import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { log } from "console";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await axios.get(`https://ipapi.co/json/`);
  const countryCode = result.data.country_code;
  const Hello = await axios.get(
    `https://hellosalut.stefanbohacek.dev/?cc=${countryCode}`
  );
  const HTMLHello = Hello.data.hello;
  res.render("index.ejs", {
    data: { Hello: HTMLHello },
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
