import fs from 'fs'
import Client from 'ssh2-sftp-client'
import { stdout } from 'node:process'
import { deployConfig } from './deployConfig.js'

const main = async () => {
  const sftp = new Client()

  stdout.write('Connecting...')
  await sftp.connect(deployConfig)
  stdout.write(' [OK]\r\n')

  stdout.write('Getting remote files list to remove...')
  const filesToRemove = await sftp.list(deployConfig.remoteDir)
  stdout.write(' [OK]\r\n')

  for (const f of filesToRemove) {
    stdout.write(`Removing remote file "${f.name}" ...`)
    const remoteFile = `${deployConfig.remoteDir}/${f.name}`
    await sftp.delete(remoteFile)
    stdout.write(' [OK]\r\n')
  }

  const filesToUpload = fs.readdirSync(deployConfig.localDir)
  for (const f of filesToUpload) {
    stdout.write(`Uploading file "${f}" ...`)
    const localFile = `${deployConfig.localDir}/${f}`
    const remoteFile = `${deployConfig.remoteDir}/${f}`
    await sftp.put(fs.createReadStream(localFile), remoteFile)
    stdout.write(' [OK]\r\n')
  }

  stdout.write('Disconnecting...')
  await sftp.end()
  stdout.write(' [OK]\r\n')
}

main()
