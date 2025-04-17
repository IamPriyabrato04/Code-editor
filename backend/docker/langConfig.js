const LANG_CONFIG = {
    javascript: {
      image: "node:20",
      ext: "js",
      cmd: (filename, input) => `node ${filename}`,
    },
    python: {
      image: "python:3.11",
      ext: "py",
      cmd: (filename, input) => `python ${filename}`,
    },
    cpp: {
      image: "gcc:latest",
      ext: "cpp",
      cmd: (filename, input) =>
        `g++ ${filename} -o /app/a.out && echo "${input}" | ./a.out`,
    },
  };
  
  export default LANG_CONFIG;
  