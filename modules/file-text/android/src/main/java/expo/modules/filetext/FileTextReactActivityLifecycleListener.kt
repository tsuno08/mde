package expo.modules.filetext

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class FileTextReactActivityLifecycleListener : ReactActivityLifecycleListener {

    override fun onCreate(activity: Activity?, savedInstanceState: Bundle?) {
        if (activity == null) return
        FileTextSingleton.setActivity(activity)
        val uri = activity.intent.data ?: return
        activity.contentResolver.openInputStream(uri)?.use { inputStream ->
            val text = inputStream.bufferedReader().use { it.readText() }
            FileTextSingleton.setText(text)
        }
    }

    override fun onNewIntent(intent: Intent): Boolean {
        val uri = intent.data ?: return false
        FileTextSingleton.getActivity()?.contentResolver?.openInputStream(uri)?.use { inputStream ->
            val text = inputStream.bufferedReader().use { it.readText() }
            FileTextSingleton.setText(text)
            FileTextModule.instance?.sendEvent("onIntentReceived", mapOf("text" to text, "uri" to uri))
        }
        return true
    }
}
