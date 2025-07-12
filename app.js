import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const input = {
  top_k: 50,
  top_p: 0.9,
  prompt:
    "What is the capital of Indonesia, and how abaout the culture and language spoken there?",
  max_tokens: 512,
  min_tokens: 0,
  temperature: 0.6,
  presence_penalty: 0,
  frequency_penalty: 0,
};

let output = "";
for await (const event of replicate.stream(
  "ibm-granite/granite-3.3-8b-instruct",
  { input }
)) {
  output += event;
}
console.log("\nGenerated Output:\n", output.trim());
