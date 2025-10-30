/*
 * Copyright (c) 2025 Mohammad Amin Derakhshande
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require("express-async-errors");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// تنظیمات CORS
app.use(
  cors({
    origin: process.env.ORIGIN_URL, // آدرس فرانت (Next.js)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // برای کوکی یا هدرهای خاص
  })
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const debug = require("debug")("app");

const router = require("./src/routes"); // the file name is index so the express will recognize it automaticly

require("./startup/config")(app, express, path);
require("./startup/db")();
require("./startup/logging")();

const mode = process.env.NODE_ENV;

app.use("/api", router);

app.get("*", (req, res) => {
  mode === "production"
    ? res.sendFile(path.join(__dirname, "client", "index.html"))
    : res.send(`you are in ${mode} mode`);
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
app.listen(port, host, () => debug(`listening on http://${host}:${port}`));

require("./cron/orderStatusSwitch");
