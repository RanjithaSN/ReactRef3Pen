To run the translation generator, you will first need to get the api key for azure.  Check with Adam Miller or Matt Borgman

Open translate.settings.js.  **exports.destinationLocales** contains the list of language codes to translate. 

**exports.sourceFiles** contains the source locale files to translate.

Assuming your folder structure looks similar to selfcare/selfcare, selfcare/selfcare-ui and selfcare/selfcare-core and your current working directory is selfcare/selfcare, execute 

    node tools/translations/translate.js <api key>

This will perform the translation and merge the results with the existing files.

Only keys that do not exist in the destination files will be translated.

Review the changes to ensure the new translations appear correct.  The service sometimes has issues with regular expressions.