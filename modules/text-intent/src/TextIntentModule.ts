import { NativeModule, requireNativeModule } from "expo";
import { EventSubscription } from "expo-modules-core";

declare class TextIntentModuleClass extends NativeModule {
  getTextIntent(): string;
  setTextIntent(text: string): void;
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
