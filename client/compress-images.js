import sharp from 'sharp'
import { readdirSync, statSync, renameSync } from 'fs'
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

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function compress(path, attempt = 1) {
  const originalSize = statSync(path).size
  try {
    const buffer = await sharp(path)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY })
      .toBuffer()

    const tempPath = path + '.tmp'
    const fs = await import('fs/promises')
    await fs.writeFile(tempPath, buffer)
    renameSync(tempPath, path)

    const newSize = buffer.length
    const saved = ((1 - newSize / originalSize) * 100).toFixed(0)
    console.log(`${path}: ${(originalSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB (saved ${saved}%)`)
  } catch (e) {
    if (attempt < 3) {
      console.log(`Retry ${attempt} for ${path}...`)
      await wait(500)
      await compress(path, attempt + 1)
    } else {
      console.log(`FAILED after 3 attempts: ${path} — ${e.message}`)
    }
  }
}

const files = walk(SOURCE_DIR)
console.log(`Found ${files.length} images. Compressing...\n`)

for (const file of files) {
  await compress(file)
}

console.log('\nDone.')