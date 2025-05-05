package expo.modules.textintent

import android.content.Intent
import expo.modules.core.interfaces.SingletonModule

object TextIntentSingleton : SingletonModule {

    override fun getName(): String {
        return "TextIntent"
    }

    var intent: Intent? = null
    var text : String? = null
}
