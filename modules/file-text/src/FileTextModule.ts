import { NativeModule, requireNativeModule } from "expo";
import { EventSubscription } from "expo-modules-core";

type ErrorMessage = string;

declare class FileTextModuleClass extends NativeModule {
  getFileText(): string;
  setFileText(text: string): ErrorMessage;
  addListener(
    eventName: string,
    listener: (event: NewIntentEvent) => void
  ): EventSubscription;
}

export type NewIntentEvent = {
  text: string;
};

export const FileTextModule =
  requireNativeModule<FileTextModuleClass>("FileText");
