NPM=npm run

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


adbLocalArabic:
	adb shell settings put system system_locales ar-SA
	adb reboot

adbLocalEng:
	adb shell settings put system system_locales en-GB
	adb reboot


adbNightModeOn:
	adb shell cmd uimode night yes

clearFull:	
	rm -rf node_modules
	npm cache clean --force
	rm -rf /tmp/metro-*
	watchman watch-del-all

freshStart: clearFull
	npm install

iosPodRefresh:
	cd ios; pod deintegrate || true ;rm -rf Pods Podfile.lock; pod repo update; pod install; cd ..; 
	npm run ios
