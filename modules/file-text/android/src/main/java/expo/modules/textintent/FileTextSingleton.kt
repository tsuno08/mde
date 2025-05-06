package expo.modules.filetext

import android.app.Activity
import expo.modules.core.interfaces.SingletonModule
import java.lang.ref.WeakReference

object FileTextSingleton : SingletonModule {
    override fun getName(): String = "FileText"

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
