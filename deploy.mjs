import fs from 'fs'
import path from 'path'
import Client from 'ssh2-sftp-client'
import { stdout } from 'node:process'
import { deployConfig } from './deployConfig.js'

const excludes = ['light-theme', 'dark-theme']

const main = async () => {
  const sftp = new Client()

  stdout.write('Connecting...')
  await sftp.connect(deployConfig)
  stdout.write(' [OK]\r\n')

  stdout.write('Getting remote files list to remove...')
  let filesToRemove = await sftp.list(deployConfig.remoteDir)
  const imagesToRemove = await sftp.list(deployConfig.remoteImgDir)
  filesToRemove.concat(imagesToRemove)
  stdout.write(' [OK]\r\n')

  for (const f of filesToRemove) {
    if (excludes.includes(f.name)) {
      continue
    }

    stdout.write(`Removing remote file "${f.name}" ...`)
    const remoteFile = `${deployConfig.remoteDir}/${f.name}`
    await sftp.delete(remoteFile)
    stdout.write(' [OK]\r\n')
  }

  const filesToUpload = fs.readdirSync(deployConfig.localDir)

  for (const f of filesToUpload) {
    const imgExtensions = ['.png']
    const fullPath = path.join(deployConfig.localDir, f)
    const ext = path.extname(f)
    const stats = fs.statSync(fullPath)

    if (stats.isDirectory()) {
      continue
    }

    stdout.write(`Uploading file "${f}" ...`)
    const localFile = `${deployConfig.localDir}/${f}`
    let remoteFile = `${deployConfig.remoteDir}/${f}`
    if (imgExtensions.includes(ext)) {
      remoteFile = `${deployConfig.remoteImgDir}/${f}`
    }
    await sftp.put(fs.createReadStream(localFile), remoteFile)
    stdout.write(' [OK]\r\n')
  }

  stdout.write('Disconnecting...')
  await sftp.end()
  stdout.write(' [OK]\r\n')
}

main()
