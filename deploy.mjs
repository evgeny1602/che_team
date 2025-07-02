import fs from 'fs'
import path from 'path'
import Client from 'ssh2-sftp-client'
import { stdout } from 'node:process'
import { deployConfig } from './deployConfig.js'

const imgExtensions = ['.png']

const main = async () => {
  const localFiles = fs.readdirSync(deployConfig.localDir)

  let localFilesToUpload = []
  let localImagesToUpload = []

  for (const f of localFiles) {
    const fullPath = path.join(deployConfig.localDir, f)
    const stats = fs.statSync(fullPath)
    const isDirectory = stats.isDirectory()

    if (isDirectory) {
      continue
    }

    const ext = path.extname(f)
    const isImage = imgExtensions.includes(ext)

    if (isImage) {
      localImagesToUpload.push(f)
    } else {
      localFilesToUpload.push(f)
    }
  }

  const sftp = new Client()

  stdout.write('Connecting...')
  await sftp.connect(deployConfig)
  stdout.write(' [OK]\r\n')

  stdout.write('Getting remote files list...')
  const filesLists = await Promise.all([
    sftp.list(deployConfig.remoteDir),
    sftp.list(deployConfig.remoteImgDir),
  ])
  const remoteFiles = [...filesLists[0], ...filesLists[1]]
  stdout.write(' [OK]\r\n')

  const remoteFilesToRemove = remoteFiles.filter((f) =>
    f.name.startsWith('index-')
  )

  const removeTasks = remoteFilesToRemove.map((f) =>
    sftp.delete(`${deployConfig.remoteDir}/${f.name}`)
  )

  stdout.write(`Removing remote files ...`)
  await Promise.all(removeTasks)
  stdout.write(' [OK]\r\n')

  const remoteFileNames = remoteFiles
    .filter((f) => !remoteFilesToRemove.includes(f))
    .map((f) => f.name)

  localFilesToUpload = localFilesToUpload.filter(
    (f) => !remoteFileNames.includes(f)
  )
  localImagesToUpload = localImagesToUpload.filter(
    (f) => !remoteFileNames.includes(f)
  )

  const uploadDataFiles = localFilesToUpload.map((f) => [
    `${deployConfig.localDir}/${f}`,
    `${deployConfig.remoteDir}/${f}`,
  ])

  const uploadDataImages = localImagesToUpload.map((f) => [
    `${deployConfig.localDir}/${f}`,
    `${deployConfig.remoteImgDir}/${f}`,
  ])

  const uploadTasks = [...uploadDataFiles, ...uploadDataImages].map((data) =>
    sftp.put(fs.createReadStream(data[0]), data[1])
  )

  stdout.write('Uploading files...')
  await Promise.all(uploadTasks)
  stdout.write(' [OK]\r\n')

  stdout.write('Disconnecting...')
  await sftp.end()
  stdout.write(' [OK]\r\n')
}

main()
