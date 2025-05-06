package expo.modules.filetext

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class FileTextModule : Module() {
  companion object {
    var instance: FileTextModule? = null
  }

  init {
    instance = this
  }

  override fun definition() = ModuleDefinition {
    Name("FileText")

    Events("onIntentReceived")

    Function("getFileText") {
      return@Function FileTextSingleton.getText()
    }

    Function("setFileText") { text: String ->
      val activity = FileTextSingleton.getActivity()
      val uri = activity?.intent?.data

      try {
        if (uri != null) {
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
