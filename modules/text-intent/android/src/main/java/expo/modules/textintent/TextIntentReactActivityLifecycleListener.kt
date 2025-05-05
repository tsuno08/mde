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
        activity?.intent?.let { intent ->
            intent.data?.let { uri ->
                activity.contentResolver.openInputStream(uri)?.use { inputStream ->
                    val text = inputStream.bufferedReader().use { it.readText() }
                    TextIntentSingleton.text = text
                }
            }

            if (intent != null) {
                TextIntentSingleton.activity = activity
            }
        }
    }

    override fun onNewIntent(intent: Intent): Boolean {
        TextIntentModule.instance?.sendEvent("onIntentReceived", bundleOf("intent" to intent))
        return true
    }
}
