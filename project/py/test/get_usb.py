#!/usr/bin/python
import os
import sys

partitionsFile = open("/proc/partitions")
lines = partitionsFile.readlines()[2:]					#Skips the header lines
for line in lines:
    words = [x.strip() for x in line.split()]
    minorNumber = int(words[1])
    deviceName = words[3]
    if minorNumber % 16 == 0:
        path = "/sys/class/block/" + deviceName
        if os.path.islink(path):
            if os.path.realpath(path).find("/usb") > 0:
          	sys.stdout.write("/dev/%s" % deviceName)
#		sys.stdout.write("\n");
