import { extname, join, dirname, relative } from "path";
import "zx/globals";
import { marked } from "marked";
import ejs from "ejs";

const EXTNAMES = [".md", ".mdx"];

export const getMdFiles = (
  dir: string,
  extnames: string[] = EXTNAMES,
  fileList: string[] = []
) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getMdFiles(filePath, extnames, fileList);
    } else if (extnames.includes(extname(file))) {
      fileList.push(filePath);
    }
  });

  return fileList;
};

(async () => {
  const docs = "docs";
  const template = "document.ejs";
  const dir = join(__dirname, "docs");
  const dist = "dist";
  const files = getMdFiles(dir);
  const templateStr = fs.readFileSync(template, "utf-8");
  for (const filePath of files) {
    const mdText = fs.readFileSync(filePath, "utf-8");
    if (!mdText) continue;
    const fileName = filePath.replace("md", "html").replace(docs, dist);
    const mdContent = marked.parse(mdText, {
      mangle: false,
      headerIds: false,
    });
    const template = ejs.compile(templateStr);
    const htmlContent = template({
      mdContent,
      themePath: relative(
        dirname(fileName),
        join(__dirname, dist, "theme.css")
      ),
    });
    fs.mkdirpSync(dirname(fileName));
    fs.writeFileSync(fileName, htmlContent, "utf-8");
  }

  // copy theme.css
  fs.copyFileSync("theme.css", join(dist, "theme.css"));
})();
