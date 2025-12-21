const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/run", (req, res) => {
  const { code, language } = req.body;

  let fileName;
  let command;

  if (language === "typescript") {
    fileName = `temp-${Date.now()}.ts`;
    command = `npx ts-node --project tsconfig.json --transpile-only ${fileName}`;
  } else if(language === "python"){
    fileName = `temp-${Date.now()}.py`;
    command = `python ${fileName}`;
  }
  else if(language === "php"){
    fileName = `temp-${Date.now()}.php`;
    command = `"C:\\xampp\\php\\php.exe" ${fileName}`;
  }
  else {
    fileName = `temp-${Date.now()}.js`;
    command = `node ${fileName}`;
  }

  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, code);

  exec(command, { timeout: 4000, shell: true }, (error, stdout, stderr) => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    if (error) {
      const match = stderr.match(/:(\d+)/);
      const line = match ? Number(match[1]) : null;

      return res.json({
        error: stderr || error.message,
        line
      });
    }

    res.json({ output: stdout || "No output" });
  });
});

const PORT = 1729;
app.listen(PORT, () => {
  console.log(`server is running on the port - ${PORT}`);
});
