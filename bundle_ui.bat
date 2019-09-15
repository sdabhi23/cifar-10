cd ui

rm -rf build

CALL yarn build

cd ..

rm -rf static/*

rm -rf templates/*

cp ui/build/index.html templates/

cp -r ui/build/static/* static/

cp ui/build/*.json templates/

cp ui/build/*.png templates/

cp ui/build/*.js templates/