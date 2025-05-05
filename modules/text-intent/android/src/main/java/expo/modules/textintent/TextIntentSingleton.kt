package expo.modules.textintent

import android.app.Activity
import expo.modules.core.interfaces.SingletonModule

object TextIntentSingleton : SingletonModule {
    override fun getName(): String {
        return "TextIntent"
    }

    var activity: Activity? = null
    var text : String? = null
}
