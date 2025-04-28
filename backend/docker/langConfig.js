const LANG_CONFIG = {
  javascript: {
    image: "node:20-alpine",
    ext: "js",
    cmd: (filename, input) => `node ${filename}`,
  },
  python: {
    image: "python:3.11-alpine",
    ext: "py",
    cmd: (filename, input) => `python ${filename}`,
  },
  cpp: {
    image: "gcc:latest",
    ext: "cpp",
    cmd: (fileName, input) =>
      `g++ /temp/${fileName} -o /temp/a.out && echo "" | /temp/a.out`
  },
  java: {
    image: "openjdk:17-alpine",
    ext: "java",
    cmd: (filename, input) =>
      `javac ${filename} && echo "${input}" | java ${filename.replace(".java", "")}`,
  },
  go: {
    image: "golang:1.21-alpine",
    ext: "go",
    cmd: (filename, input) =>
      `echo "${input}" | go run ${filename}`,
  }
};

export default LANG_CONFIG;
