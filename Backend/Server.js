const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const sandboxDir = path.join(__dirname, "sandbox");
if (!fs.existsSync(sandboxDir)) {
  fs.mkdirSync(sandboxDir);
}

app.post("/run", (req, res) => {
  try {
    let { code, language } = req.body;

    let fileName;
    let command;

    if (language === "typescript") {
      fileName = `temp-${Date.now()}.ts`;
      command = `npx ts-node --transpile-only ${fileName}`;
    } 
    else if (language === "python") {
      fileName = `temp-${Date.now()}.py`;
      command = `python ${fileName}`;
    } 
    else if (language === "php") {
      fileName = `temp-${Date.now()}.php`;
      if (!code.trim().startsWith("<?php")) {
        code = `<?php\n
        ${code}`;
      }
      command = `docker run --rm -v "${sandboxDir}:/app" php:8.3-cli php /app/${fileName}`;
    } 
    else if (language === "c") {
      fileName = `temp-${Date.now()}.c`;
      command = `docker run --rm --mount type=bind,source="${sandboxDir}",target=/app gcc:latest sh -c "gcc /app/${fileName} -o /app/a.out && /app/a.out"`;
    }

    // else if (language === "ruby") {
    //   fileName = `temp-${Date.now()}.rb`;
    //   command = `ruby ${fileName}`;
    // } 
    // else if (language === "r") {
    //   fileName = `temp-${Date.now()}.R`;
    //   command = `Rscript ${fileName}`;
    // } 
    else if (language === "dart") {
      fileName = `temp-${Date.now()}.dart`;
      if (!code.includes("main(")) {
        code = `void main() {\n${code}\n}`;
      }
      command = `docker run --rm -v "${sandboxDir}:/app" dart:stable dart /app/${fileName}`;
    } 
    else {
      fileName = `temp-${Date.now()}.js`;
      command = `node ${fileName}`;
    }

    const filePath = path.join(sandboxDir, fileName);
    fs.writeFileSync(filePath, code);

    exec(command, { timeout: 4000, shell: true, cwd:sandboxDir}, (error, stdout, stderr) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      if (error) {
        const match = stderr?.match(/:(\d+)/);
        const line = match ? Number(match[1]) : null;

        return res.json({
          error: stderr || error.message,
          line
        });
      }

      res.json({ output: stdout || "No output" });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 1729;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
