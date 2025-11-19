import fs from "fs";
import { swaggerSpec } from "./swagger";

const outputPath = "./public/openapi.json";
fs.mkdirSync("./public", { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
console.log(`OpenAPI JSON written to ${outputPath}`);
