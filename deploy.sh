echo "Starting deploy..."

[ -z "$TRAVIS_BUILD_NUMBER" ] && echo "TRAVIS_BUILD_NUMBER not set" && exit 1
[ -z "$TRAVIS_COMMIT" ] && echo "TRAVIS_COMMIT not set" && exit 1
[ -z "$GH_TOKEN" ] && echo "GH_TOKEN not set" && exit 1
[ -z "$GH_REF" ] && echo "GH_REF not set" && exit 1

GH_PAGES_BRANCH=gh-pages

rm -rf deploy
git clone https://${GH_REF} --branch=$GH_PAGES_BRANCH --single-branch deploy

(
  cd deploy

  rm -rf *
  cp -R ../out/* .

  git config user.name "Travis-CI"
  git config user.email "david.p.wood+travis@gmail.com"
  git add -A
  git commit -m "Deploy build ${TRAVIS_BUILD_NUMBER} (commit ${TRAVIS_COMMIT})"
  git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" $GH_PAGES_BRANCH > /dev/null 2>&1
)