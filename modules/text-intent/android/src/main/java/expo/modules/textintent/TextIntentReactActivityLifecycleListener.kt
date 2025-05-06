package expo.modules.textintent

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class TextIntentReactActivityLifecycleListener :
        ReactActivityLifecycleListener {

    override fun onCreate(activity: Activity?, savedInstanceState: Bundle?) {
        TextIntentSingleton.setActivity(activity)
        activity?.intent?.let { intent ->
            intent.data?.let { uri ->
                activity.contentResolver.openInputStream(uri)?.use { inputStream ->
                    val text = inputStream.bufferedReader().use { it.readText() }
                    TextIntentSingleton.setText(text)
                }
            }
        }
    }

    override fun onNewIntent(intent: Intent): Boolean {
        val uri = intent.data ?: return false
        TextIntentSingleton.getActivity()?.contentResolver?.openInputStream(uri)?.use { inputStream ->
            val text = inputStream.bufferedReader().use { it.readText() }
            TextIntentSingleton.setText(text)
            TextIntentModule.instance?.sendEvent("onIntentReceived", mapOf("text" to text))
        }
        return true
    }
}
