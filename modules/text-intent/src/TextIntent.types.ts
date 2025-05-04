export type TextIntentModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

type ChangeEventPayload = {
  value: string;
};
