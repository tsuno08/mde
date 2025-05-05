package expo.modules.textintent

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.textintent.TextIntentSingleton

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
      return@Function TextIntentSingleton.text
    }

    Function("setTextIntent") { text: String ->
      val activity = TextIntentSingleton.activity
      val uri = activity?.intent?.data

      if (uri != null) {
        activity?.contentResolver?.openOutputStream(uri)?.use { outputStream ->
          outputStream.write(text.toByteArray())
        }
      }
    }
  }
}
