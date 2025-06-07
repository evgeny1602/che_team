import fs from 'fs'

export const deployConfig = {
  host: '194.164.33.123',
  port: '1026',
  username: 'admin',
  privateKey: fs.readFileSync('c:/Users/User/.ssh/id_rsa_vdsina'),
  remoteDir: '/var/www/wwwuser/data/www/tvsboy.com/che_team/assets',
  localDir: './dist/assets',
}
