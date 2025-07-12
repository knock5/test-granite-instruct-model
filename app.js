import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const input = {
  top_k: 50,
  top_p: 0.9,
  prompt: "Give complete code varian (rgb, hex, etc) for green color",
  max_tokens: 512,
  min_tokens: 0,
  temperature: 0.6,
  presence_penalty: 0,
  frequency_penalty: 0,
};

const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", {
  input,
});

console.log(output);

// // JSON output
// const jsonOutput = {
//   input,
//   output: Array.isArray(output)
//     ? output.join("").trim()
//     : String(output).trim(),
// };

// // Print JSON output
// console.log("\nJSON Output:\n", JSON.stringify(jsonOutput, null, 2));
