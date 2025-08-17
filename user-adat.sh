#!/bin/bash

# Switch to the 'ubuntu' user to run all subsequent commands
sudo -i -u ubuntu bash << EOF

# Load the nvm environment. This automatically finds the correct path
# to your v22.18.0/bin directory and makes 'node', 'bun', etc. available.
source /home/ubuntu/.nvm/nvm.sh

cd /home/ubuntu/ASG-Tasting

pm2 start bin.ts --interpreter bun --name "AGS_Testing"

pm2 save

EOF