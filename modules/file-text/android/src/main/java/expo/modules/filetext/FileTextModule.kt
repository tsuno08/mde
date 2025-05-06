package expo.modules.filetext

import androidx.core.net.toUri
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

    Function("setFileText") { data: Map<String, String> ->
      if (data["text"] == null || data["uri"] == null) {
        return@Function "text or uri is null"
      }
      val activity = FileTextSingleton.getActivity() ?: return@Function "Activity not found"

      try {
        activity.contentResolver?.openOutputStream(data["uri"]!!.toUri())?.use { outputStream ->
          outputStream.write(data["text"]!!.toByteArray())
        }
        return@Function ""
      } catch (e: Exception) {
        return@Function e.message
      }
    }
  }
}
