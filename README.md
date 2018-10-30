# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`

If two arguments aren't supplied, the program won't attempt a request.

The program will log a message when it's started, and log a message when it's successfully finished.
