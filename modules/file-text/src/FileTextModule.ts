import { NativeModule, requireNativeModule } from "expo";
import { EventSubscription } from "expo-modules-core";

type ErrorMessage = string;

declare class FileTextModuleClass extends NativeModule {
  getFileText(): FileTextData;
  setFileText(data: FileTextData): ErrorMessage;
  addListener(
    eventName: string,
    listener: (event: FileTextData) => void
  ): EventSubscription;
}

export type FileTextData = {
  text: string;
  uri: string;
};

export const FileTextModule =
  requireNativeModule<FileTextModuleClass>("FileText");
