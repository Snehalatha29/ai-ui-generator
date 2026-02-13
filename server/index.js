import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { runPlanner } from "./agents/planner.js";
import { runGenerator } from "./agents/generator.js";
import { runValidator } from "./agents/validator.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("🧠 Planner running...");
    const plan = await runPlanner(prompt);

    console.log("🛡️ Validator running...");
    const validPlan = await runValidator(plan);

    console.log("⚙️ Generator running...");
    const html = await runGenerator(validPlan);

    res.json({ plan: validPlan, html });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
