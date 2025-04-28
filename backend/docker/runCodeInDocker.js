import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";
import docker from "./dockerClient.js";
import LANG_CONFIG from "./langConfig.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const runCodeInDocker = async (language, code, input = "") => {
  if (!LANG_CONFIG[language]) throw new Error("Unsupported language");

  const { image, ext, cmd } = LANG_CONFIG[language];
  const fileId = uuid();
  const filename = `${fileId}.${ext}`;
  const filePath = path.join(__dirname, "..", "temp", filename);
  const bindPath = path.resolve(__dirname, "..", "temp").replace(/\\/g, "/");


  try {
    fs.writeFileSync(filePath, code, { encoding: 'utf8' });

    console.log("Writing file:", filePath);


    const container = await docker.createContainer({
      Image: image,
      Tty: false,
      Cmd: ["/bin/sh", "-c", cmd(`/app/${filename}`, input)],
      HostConfig: {
        AutoRemove: true,
        Binds: [`${bindPath}:/app`],
        Memory: 512 * 1024 * 1024,
        NetworkMode: "none",
      },
    });
    console.log("Docker Image:", image);
    console.log("Docker CMD:", cmd(`/app/${filename}`, input));
    console.log("Full Path (host bind):", path.resolve(__dirname, "..", "temp").replace(/\\/g, "/"));

    try {
      await container.start();
      console.log("Running Docker container...");
    } catch (err) {
      console.error("Error starting container:", err);
    }


    const stream = await container.attach({ stream: true, stdout: true, stderr: true });
    let output = "";

    stream.on("data", (chunk) => {
      output += chunk.toString();
    });

    await container.wait();
    fs.unlinkSync(filePath);
    output = output.replace(/^\s*[\x00-\x1F]+/, ''); // remove weird leading control characters
    console.log(output);
    return output;
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.error("Execution error:", err.message || err);
  }
};

export default runCodeInDocker;