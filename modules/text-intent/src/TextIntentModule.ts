import { NativeModule, requireNativeModule } from "expo";
import { EventSubscription } from "expo-modules-core";

declare class TextIntentModuleClass extends NativeModule {
  getTextIntent(): string;
  setTextIntent(text: string): void;
  addListener(
    eventName: string,
    listener: (event: any) => void
  ): EventSubscription;
}

export type NewIntentEvent = {
  intent: string;
};

// This call loads the native module object from the JSI.
export const TextIntentModule =
  requireNativeModule<TextIntentModuleClass>("TextIntent");

export function addNewIntentListener(
  listener: (event: NewIntentEvent) => void
): EventSubscription {
  return TextIntentModule.addListener("onIntentReceived", listener);
}
