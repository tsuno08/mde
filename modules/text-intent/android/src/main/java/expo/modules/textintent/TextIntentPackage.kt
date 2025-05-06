package expo.modules.textintent

import android.content.Context
import expo.modules.core.interfaces.Package
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class TextIntentPackage : Package {
    override fun createReactActivityLifecycleListeners(
            activityContext: Context
    ): List<ReactActivityLifecycleListener> {
        return listOf(TextIntentReactActivityLifecycleListener())
    }
}
