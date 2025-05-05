import { NativeModule, requireNativeModule } from 'expo';

declare class TextIntentModuleClass extends NativeModule {
  getTextIntent(): string;
}

// This call loads the native module object from the JSI.
export const TextIntentModule = requireNativeModule<TextIntentModuleClass>('TextIntent');
