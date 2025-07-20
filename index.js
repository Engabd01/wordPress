import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/recipe", (req, res) => {
  // Get the data from the form
  const num1 = parseFloat(req.body.value1);
  const num2 = parseFloat(req.body.value2);
  const operation = req.body.operation;

  let result;

  // Perform the calculation based on the selected operation
  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        result = "Error: Cannot divide by zero";
      } else {
        result = num1 / num2;
      }
      break;
    default:
      result = "Invalid operation";
  }

  // Render the page again, passing the result back to the EJS file
  res.render("index.ejs", { result: result });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});