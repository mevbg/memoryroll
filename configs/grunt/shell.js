var grunt = require('grunt');

module.exports = {
  feature: {
    command: [
      'read -p "Commit message: " msg',
      'FEATURE_BRANCH="$(git rev-parse --abbrev-ref HEAD)"',
      'git checkout dev',
      'git merge --squash ${FEATURE_BRANCH} && git reset',
      'git add . && git commit -m "$msg"',
      'git branch -D ${FEATURE_BRANCH}'
    ].join('&&')
  },

  prepare: {
    command: 'git checkout -b release dev'
  },

  changelog: {
    command: [
      'touch CHANGELOG.md',
      'grunt conventionalChangelog',
      'git add CHANGELOG.md',
      'git commit -m "CHANGELOG"'
    ].join('&&')
  },

  prod: {
    command: [
      'git checkout prod',
      'git merge --no-ff staging -m "Release v<%= pkg.version %>"'
    ].join('&&')
  },

  dist: {
    command: [
      'git add "assets" "dist" "index.html"',
      'git commit -m "Distribution"'
    ].join('&&')
  },

  domain: {
    command: 'printf "' + grunt.pluginData.domain + '" > CNAME'
  },

  release: {
    command: [
      'git add . && git commit -m "v<%= pkg.version %>"',
      'git push -u origin release',
      'git checkout dev',
      'git merge --no-ff release -m \'Merge branch "release" into "dev"\'',
      'git push',
      'git branch -D release',
      'grunt concurrent:review'
    ].join('&&')
  }
};