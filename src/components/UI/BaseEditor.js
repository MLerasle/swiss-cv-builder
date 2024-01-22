import { useEffect } from "react";
import "../../styles/base-editor.css";
import { BLUR_COMMAND, FOCUS_COMMAND, COMMAND_PRIORITY_EDITOR } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { ToolbarPlugin } from "./BaseEditorPlugins/Toolbar";

const theme = {
  text: {
    bold: "editor-bold",
    italic: "editor-italic",
    underline: "editor-underline",
    strikethrough: "editor-strikethrough",
    underlineStrikethrough: "editor-underlineStrikethrough",
  },
  list: {
    ul: "editor-list-ul",
  },
};

function onError(error) {
  console.error(error);
}

export function BaseEditor({ label, initialContent, onFocus, onBlur }) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode],
    editorState:
      initialContent ||
      '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
  };

  const EditorBlurPlugin = ({ onBlur }) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          onBlur(JSON.stringify(editor.getEditorState().toJSON()));
        },
        COMMAND_PRIORITY_EDITOR
      );
    }, [editor]);

    return null;
  };

  const EditorFocusPlugin = ({ onFocus }) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          onFocus();
        },
        COMMAND_PRIORITY_EDITOR
      );
    }, [editor]);

    return null;
  };

  return (
    <>
      <span className="block text-sm font-medium leading-6 text-gray-900 mt-8 mb-1">
        {label}
      </span>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <ListPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-60 px-3 pt-12 pb-2 bg-white border border-gray-200 box-border rounded-xl outline-none focus:border-blue-500 relative contentEditable" />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <EditorFocusPlugin onFocus={() => onFocus()} />
        <EditorBlurPlugin onBlur={(e) => onBlur(e)} />
      </LexicalComposer>
    </>
  );
}
