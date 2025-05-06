package expo.modules.filetext

import android.net.Uri
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
      val uri = FileTextSingleton.getActivity()?.intent?.data ?: return@Function ""
      return@Function mapOf("text" to FileTextSingleton.getText(), "uri" to uri)
    }

    Function("setFileText") { text: String, uri: Uri ->
      val activity = FileTextSingleton.getActivity() ?: return@Function "Activity not found"

      try {
        activity.contentResolver?.openOutputStream(uri)?.use { outputStream ->
          outputStream.write(text.toByteArray())
        }
        return@Function ""
      } catch (e: Exception) {
        return@Function e.message
      }
    }
  }
}
