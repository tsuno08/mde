package expo.modules.textintent

import android.app.Activity
import expo.modules.core.interfaces.SingletonModule
import java.lang.ref.WeakReference

object TextIntentSingleton : SingletonModule {
    override fun getName(): String = "TextIntent"

    private var activityRef: WeakReference<Activity>? = null
    private var text: String? = null

    fun setText(text: String) {
        this.text = text
    }

    fun getText(): String? = text

    fun setActivity(activity: Activity?) {
        activityRef = WeakReference(activity)
    }

    fun getActivity(): Activity? = activityRef?.get()
}
