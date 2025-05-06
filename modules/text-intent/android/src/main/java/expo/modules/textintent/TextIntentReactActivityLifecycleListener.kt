package expo.modules.textintent

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.core.os.bundleOf
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class TextIntentReactActivityLifecycleListener(activityContext: Context) :
        ReactActivityLifecycleListener {

    override fun onCreate(activity: Activity?, savedInstanceState: Bundle?) {
        TextIntentSingleton.activity = activity
        activity?.intent?.let { intent ->
            intent.data?.let { uri ->
                activity.contentResolver.openInputStream(uri)?.use { inputStream ->
                    val text = inputStream.bufferedReader().use { it.readText() }
                    TextIntentSingleton.text = text
                }
            }
        }
    }

    override fun onNewIntent(intent: Intent): Boolean {
        val uri = intent.data
        if (uri == null) {
            return false
        }
        TextIntentSingleton.activity?.contentResolver?.openInputStream(uri)?.use { inputStream ->
            val text = inputStream.bufferedReader().use { it.readText() }
            TextIntentSingleton.text = text
            TextIntentModule.instance?.sendEvent("onIntentReceived", mapOf("text" to text))
        }
        return true
    }
}
