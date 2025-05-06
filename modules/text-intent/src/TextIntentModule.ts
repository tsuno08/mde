import { NativeModule, requireNativeModule } from "expo";
import { EventSubscription } from "expo-modules-core";

type ErrorMessage = string;

declare class TextIntentModuleClass extends NativeModule {
  getTextIntent(): string;
  setTextIntent(text: string): ErrorMessage;
  addListener(
    eventName: string,
    listener: (event: NewIntentEvent) => void
  ): EventSubscription;
}

export type NewIntentEvent = {
  text: string;
};

export const TextIntentModule =
  requireNativeModule<TextIntentModuleClass>("TextIntent");
