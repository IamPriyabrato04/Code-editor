import runCodeInDocker from '../docker/runCodeInDocker.js';

export const executeController = async (req, res) => {
  try {
    const { language, code, input } = req.body;


    const output = await runCodeInDocker(language, code, input);
    console.log(output);

    return res.status(200).json({ output });
  } catch (error) {
    console.log("Execution error:", err.message || err);
    return res.status(500).json({ error: "Code execution failed" });
  }
};