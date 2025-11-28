NPM=npm run
DEPENDENCY_NAME = Hello

newApp:
	npx @react-native-community/cli@latest init AwesomeProject

stopGradle:
	cd android ;./gradlew --stop; cd ..

androidClean:
	$(NPM) android:clean

androidRun-fresh: androidClean
	$(NPM) android

androidRun:
	$(NPM) android

iosClean:
	$(NPM) ios:clean

installDevDependencies:
	@read -p "Enter dependency name to install (dev): " dep; \
	echo "Installing $$dep..."; \
	npm install -D $$dep

metro-restart:
	npx react-native start --reset-cache


adbLocalChangeArabic:
	adb shell settings put system system_locales ar-SA: adb reboot


adbNightModeOn:
	adb shell cmd uimode night yes

clearAll:	
	rm -rf node_modules
	npm install
	watchman watch-del-all
	npm start -- --reset-cache
