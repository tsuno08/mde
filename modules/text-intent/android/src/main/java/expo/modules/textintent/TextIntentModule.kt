package expo.modules.textintent

import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class TextIntentModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a
    // string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for
    // clarity.
    // The module will be accessible from `requireNativeModule('TextIntent')` in JavaScript.
    Name("TextIntent")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("getTextIntent") { // The function name is `getTextIntent`
      return@Function TextIntentSingleton.text
    }
  }
}
