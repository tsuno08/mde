import { create } from "zustand";

interface EditorState {
  text: string;
  isFileOpen: boolean;
  selection: { start: number; end: number };
  setText: (text: string) => void;
  setIsFileOpen: (isFileOpen: boolean) => void;
  setSelection: (selection: { start: number; end: number }) => void;
  insertAtCursor: (prefix: string, suffix?: string) => void;
  handleList: () => void;
  handleCode: () => void;
  handleInlineCode: () => void;
  handleLink: () => void;
  handleHeading: () => void;
}

const wrapText = (prefix: string, suffix: string = prefix) => {
  const { text, selection, setText } = useEditorStore.getState();
  const start = selection.start;
  const end = selection.end;
  const hasSelection = start !== end;
  const selectedText = hasSelection ? text.substring(start, end) : "";
  const newText =
    text.substring(0, start) +
    prefix +
    selectedText +
    suffix +
    text.substring(end);
  setText(newText);
};

const insertText = (text: string) => {
  const { selection, setText, text: currentText } = useEditorStore.getState();
  const newText =
    currentText.substring(0, selection.start) +
    text +
    currentText.substring(selection.end);
  setText(newText);
};

const useEditorStore = create<EditorState>((set, get) => ({
  text: "",
  isFileOpen: false,
  selection: { start: 0, end: 0 },
  setText: (text: string) => set({ text }),
  setIsFileOpen: (isFileOpen: boolean) => set({ isFileOpen }),
  setSelection: (selection: { start: number; end: number }) =>
    set({ selection }),
  insertAtCursor: (prefix: string, suffix?: string) => {
    wrapText(prefix, suffix);
  },
  handleList: () => {
    const { text, selection } = get();
    const start = selection.start;
    const end = selection.end;
    const hasSelection = start !== end;

    if (hasSelection) {
      const selectedText = text.substring(start, end);
      const lines = selectedText.split("\n");
      const formattedLines = lines
        .map((line) => (line.trim() ? `- ${line}` : line))
        .join("\n");
      wrapText(formattedLines);
    } else {
      insertText("- ");
    }
  },
  handleCode: () => {
    const { selection } = get();
    const hasSelection = selection.start !== selection.end;

    if (hasSelection) {
      wrapText("\n```\n", "\n```\n");
    } else {
      wrapText("```\n", "\n```");
    }
  },
  handleInlineCode: () => {
    wrapText("`");
  },
  handleLink: () => {
    wrapText("[", "]()");
  },
  handleHeading: () => {
    insertText("# ");
  },
}));

export default useEditorStore;
