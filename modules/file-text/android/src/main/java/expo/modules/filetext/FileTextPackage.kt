package expo.modules.filetext

import android.content.Context
import expo.modules.core.interfaces.Package
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class FileTextPackage : Package {
    override fun createReactActivityLifecycleListeners(
            activityContext: Context
    ): List<ReactActivityLifecycleListener> {
        return listOf(FileTextReactActivityLifecycleListener())
    }
}
