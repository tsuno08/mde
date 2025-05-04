import { NativeModule, requireNativeModule } from 'expo';

import { TextIntentModuleEvents } from './TextIntent.types';

declare class TextIntentModuleClass extends NativeModule<TextIntentModuleEvents> {
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export const TextIntentModule = requireNativeModule<TextIntentModuleClass>('TextIntent');
