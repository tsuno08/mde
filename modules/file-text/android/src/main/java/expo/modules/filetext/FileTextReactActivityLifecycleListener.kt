package expo.modules.filetext

import android.app.Activity
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
            FileTextSingleton.setUri(uri)
        }
    }
}
