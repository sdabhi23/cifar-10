cd ui

rm -rf package-lock.json node_modules/

CALL npm install

rm -rf build

CALL npm run build

cd ..

rm -rf static/*

rm -rf templates/*

cp ui/build/index.html templates/

cp -r ui/build/static/* static/

cp ui/build/*.json templates/

cp ui/build/*.png templates/

cp ui/build/*.js templates/