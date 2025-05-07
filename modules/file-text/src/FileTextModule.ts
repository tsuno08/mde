import { NativeModule, requireNativeModule } from "expo";
import { EventSubscription } from "expo-modules-core";

type ErrorMessage = string;

declare class FileTextModuleClass extends NativeModule {
  getFileText(): string;
  setFileText(text: string): ErrorMessage;
  addListener(
    eventName: string,
    listener: (event: EventData) => void
  ): EventSubscription;
  openTextFile(): string;
}

export type EventData = {
  text: string;
};

export const FileTextModule =
  requireNativeModule<FileTextModuleClass>("FileText");
