const path = require("path")
const fs = require("fs")

const providersPath = path.join(
  process.cwd(),
  "/docs/reference/05-oauth-providers"
)

console.log(providersPath)

const files = fs.readdirSync(providersPath, "utf8")

const result = files.reduce((acc, file) => {
  if (file === "index.md" || file === "_category_.json") return acc
  const provider = fs.readFileSync(path.join(providersPath, file), "utf8")
  const { id, title } = provider.match(
    /id: (?<id>.+)\ntitle: (?<title>.+)\n/
  ).groups
  acc[id] = title
  return acc
}, {})

fs.writeFileSync(
  path.join(process.cwd(), "providers.json"),
  JSON.stringify(result, null, 2)
)
