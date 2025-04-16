#!/bin/bash

SWAPFILE="/swapfile"
SWAPSIZE_GB=4

# Check if swap already exists
if swapon --show | grep -q "$SWAPFILE"; then
  echo "Swap already exists at $SWAPFILE"
  exit 0
fi

# Create the swap file
echo "Creating swap file of size ${SWAPSIZE_GB}G..."
sudo fallocate -l ${SWAPSIZE_GB}G $SWAPFILE || sudo dd if=/dev/zero of=$SWAPFILE bs=1G count=$SWAPSIZE_GB

# Set correct permissions
sudo chmod 600 $SWAPFILE

# Format the file as swap
sudo mkswap $SWAPFILE

# Enable the swap
sudo swapon $SWAPFILE

# Add to /etc/fstab for automatic mounting after reboot
if ! grep -q "$SWAPFILE" /etc/fstab; then
  echo "$SWAPFILE none swap sw 0 0" | sudo tee -a /etc/fstab
fi

echo "Swap successfully created and enabled:"
swapon --show
