#!/usr/bin/env node
import sharp from "sharp";
import yargs from "yargs";
import fs from "fs/promises";
import path from "path";

const argv = yargs(process.argv.slice(2))
  .usage(
    "Usage: $0 -f <file> -s [sizes] -t [filetypes] -o [outputdir] -c [clear]"
  )
  .alias("f", "file")
  .alias("s", "sizes")
  .alias("t", "filetypes")
  .alias("o", "outputdir")
  .describe("f", "file to process")
  .describe("s", "different sizes to generate, separated by comma")
  .describe("t", "different filetypes to generate, separated by comma")
  .describe("c", "clear the output directory before processing, default false")
  .boolean("c")
  .demandOption(["file"])
  .default({
    sizes: "300,500,700",
    filetypes: "webp,avif,jpeg",
    outputdir: "public/output",
    c: false,
  })
  .example(
    "$0 -f beach.jpg -s 500,750 -t webp,avif",
    "Resize and convert beach.jpg to 500px and 750px in webp and avif format"
  ).argv;

const { file, outputdir } = argv;
const sizes = argv.sizes.split(",").map((s) => parseInt(s));

const defaultTypes = [
  { id: "webp" },
  { id: "jpeg", options: { mozjpeg: true } },
  { id: "avif" },
];

//get formats from command line arguments
const formats = argv.filetypes
  .split(",")
  .map((f) => defaultTypes.find((df) => df.id === f));

//get filename without extension
const filename = path.basename(file, path.extname(file));

//if clear flag is set, clear ouput directory
if (argv.c) {
  await fs.rm(outputdir, { recursive: true });
}
try {
  await fs.mkdir(outputdir);
} catch {}

const promises = [];
const image = sharp(file);

for (const format of formats) {
  for (const size of sizes) {
    promises.push(
      image
        .clone()
        .resize({ width: size })
        .toFormat(format.id)
        .toFile(`${outputdir}/${filename}-${size}.${format.id}`, (err) => {
          if (err) {
            console.error("Error processing file", err);
          }
        })
    );
  }
  promises.push(
    image
      .clone()
      .toFormat(format.id)
      .toFile(`${outputdir}/${filename}.${format.id}`, (err) => {
        if (err) {
          console.error("Error processing file", err);
        }
      })
  );
}

Promise.all(promises)
  .then((res) => {
    console.log("Done!");
  })
  .catch((err) => {
    console.error("Error processing files", err);
  });
