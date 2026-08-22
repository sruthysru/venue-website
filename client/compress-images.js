import sharp from 'sharp'
import { readdirSync, statSync, renameSync } from 'fs'
import { join, extname, dirname, basename } from 'path'

const SOURCE_DIR = 'src/assets/gallery'
const MAX_WIDTH = 1000
const QUALITY = 70

function walk(dir) {
  let files = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      files = files.concat(walk(fullPath))
    } else if (['.jpg', '.jpeg', '.png'].includes(extname(entry).toLowerCase())) {
      files.push(fullPath)
    }
  }
  return files
}

async function compress(path) {
  const originalSize = statSync(path).size
  const webpPath = join(dirname(path), basename(path, extname(path)) + '.webp')

  const buffer = await sharp(path)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer()

  const fs = await import('fs/promises')
  await fs.writeFile(webpPath, buffer)

  console.log(`${path} -> ${webpPath}: ${(originalSize/1024).toFixed(0)}KB -> ${(buffer.length/1024).toFixed(0)}KB`)
}

const files = walk(SOURCE_DIR)
for (const file of files) {
  await compress(file)
}
console.log('\nDone. Now update your imports in App.jsx from .jpg to .webp')