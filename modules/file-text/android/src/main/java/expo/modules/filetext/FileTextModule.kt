package expo.modules.filetext

import android.content.Intent
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class FileTextModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("FileText")

    Events("onIntentReceived")

    Function("getFileText") {
      return@Function FileTextSingleton.getText()
    }

    Function("setFileText") { text: String ->
      val activity = FileTextSingleton.getActivity() ?: return@Function "uri not found"
      val uri = FileTextSingleton.getUri() ?: return@Function "uri not found"

      try {
        activity.contentResolver?.openOutputStream(uri)?.use { outputStream ->
          outputStream.write(text.toByteArray())
        }
        return@Function ""
      } catch (e: Exception) {
        return@Function e.message
      }
    }

    Function("openTextFile") {
      val PICK_TEXT_FILE = 2
      val activity = FileTextSingleton.getActivity() ?: return@Function ""
      val intent =
              Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
                addCategory(Intent.CATEGORY_OPENABLE)
                type = "text/*"
              }

      activity.startActivityForResult(intent, PICK_TEXT_FILE)
    }

    OnActivityResult { activity, payload ->
      val uri = payload.data?.data ?: return@OnActivityResult
      activity.contentResolver.openInputStream(uri)?.use { inputStream ->
        val text = inputStream.bufferedReader().use { it.readText() }
        FileTextSingleton.setText(text)
        FileTextSingleton.setUri(uri)
        sendEvent("onIntentReceived", mapOf("text" to text, "uri" to uri))
      }
    }

    OnNewIntent { intent: Intent ->
      val uri = intent.data ?: return@OnNewIntent
      FileTextSingleton.getActivity()?.contentResolver?.openInputStream(uri)?.use { inputStream ->
        val text = inputStream.bufferedReader().use { it.readText() }
        FileTextSingleton.setText(text)
        FileTextSingleton.setUri(uri)
        sendEvent("onIntentReceived", mapOf("text" to text, "uri" to uri))
      }
    }
  }
}
