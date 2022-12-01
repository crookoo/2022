import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from 'url';

const INPUT_FOLDER = 'input';
const INPUT_FILETYPE = 'txt';

export function readInputFromFile(filename, callerUrl) {
    const __filename = fileURLToPath(callerUrl);
    const __dirname = dirname(__filename);
    const fullFileName = resolve(__dirname, `./${INPUT_FOLDER}/${filename}.${INPUT_FILETYPE}`);
    return readFileSync(fullFileName, "utf-8");
}