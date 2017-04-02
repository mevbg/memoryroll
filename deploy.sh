#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Define variables
RELEASE_BRANCH="release"
PRODUCTION_BRANCH="prod"
PAGES_BRANCH="gh-pages"
PROJECT_DIR="project"
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone a working repository and get inside
git clone $REPO $PROJECT_DIR
cd $PROJECT_DIR

# Change the remote url from https:// to git@
git remote set-url origin $SSH_REPO

# Set user data
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# Create a .gitignore that ignores node_modules, deploy_key and itself
printf 'node_modules/\n.gitignore\ndeploy_key' > .gitignore

# Checkout a local copy of the release branch
git checkout -b $RELEASE_BRANCH origin/$RELEASE_BRANCH

# Install Grunt and all dependencies
npm install -g grunt-cli
npm install

# Checkout a brand new staging branch out of production branch
git checkout -b staging $PRODUCTION_BRANCH

# Merge the release branch into the staging branch
git merge --no-ff $RELEASE_BRANCH -m 'Merge branch "$RELEASE_BRANCH" into "staging"'

# Create/Update and commit the CHANGELOG.md file
grunt shell:changelog

# Build the distribution and commit it to the staging branch
grunt build --target='prod'
grunt shell:dist

# Go back to the production branch and merge the staging branch in it
grunt shell:prod

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

# Push everything to the production branch
grunt bump-commit

# Create a brand new empty page branch
git checkout --orphan $PAGES_BRANCH

# Unstage everything (just in case)
git reset

# Create a CNAME file
grunt shell:domain

# Stage everything and make an initial commit
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Remove the remote page branch
git push origin --delete $PAGES_BRANCH

# Remove the remote release branch
git push origin --delete $RELEASE_BRANCH

# Push the new page branch to origin
git push $SSH_REPO $PAGES_BRANCH