rm -rf static/*

rm -rf templates/*

cp build/index.html templates/

cp -r build/static/* static/

cp build/*.json templates/

cp build/*.png templates/

cp build/*.js templates/

rm -rf build/

rm -rf ui/