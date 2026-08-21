import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const SOURCE_DIR = 'src/assets/gallery'
const MAX_WIDTH = 1600
const QUALITY = 75

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
  const buffer = await sharp(path)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY })
    .toBuffer()

  const fs = await import('fs/promises')
  await fs.writeFile(path, buffer)

  const newSize = buffer.length
  const saved = ((1 - newSize / originalSize) * 100).toFixed(0)
  console.log(`${path}: ${(originalSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB (saved ${saved}%)`)
}

const files = walk(SOURCE_DIR)
console.log(`Found ${files.length} images. Compressing...\n`)

for (const file of files) {
  await compress(file)
}

console.log('\nDone.')