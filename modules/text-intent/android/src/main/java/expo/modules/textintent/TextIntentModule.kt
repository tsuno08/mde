package expo.modules.textintent

import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class TextIntentModule : Module() {
  companion object {
    var instance: TextIntentModule? = null
  }

  init {
    instance = this
  }

  override fun definition() = ModuleDefinition {
    Name("TextIntent")

    Events("onIntentReceived")

    Function("getTextIntent") {
      return@Function TextIntentSingleton.getText()
    }

    Function("setTextIntent") { text: String ->
      val activity = TextIntentSingleton.getActivity()
      val uri = activity?.intent?.data

      try {
        if (uri == null) {
          activity?.openFileOutput("memo.md", Context.MODE_PRIVATE)?.use { outputStream ->
            outputStream.write(text.toByteArray(Charsets.UTF_8))
          }
        } else {
          activity.contentResolver?.openOutputStream(uri)?.use { outputStream ->
            outputStream.write(text.toByteArray())
          }
        }
        return@Function ""
      } catch (e: Exception) {
        return@Function e.message
      }
    }
  }
}
