package expo.modules.textintent

import android.app.Activity
import android.content.Context
import android.os.Bundle
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
                TextIntentSingleton.intent = intent
            }
        }
    }
}
