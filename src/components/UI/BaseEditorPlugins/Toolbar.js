import { useState, useCallback, useEffect } from "react";
import "./toolbar.css";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isRangeSelection, $getSelection } from "lexical";
import { mergeRegister } from "@lexical/utils";
import { INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import * as Toolbar from "@radix-ui/react-toolbar";
import {
  StrikethroughIcon,
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";

function ToolbarButton(props) {
  return (
    <Toolbar.Button
      className={`toolbarButton ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </Toolbar.Button>
  );
}

function TextFormatToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [updateToolbar, editor]);

  const getIcon = (format) => {
    switch (format) {
      case "bold":
        return <FontBoldIcon />;
      case "italic":
        return <FontItalicIcon />;
      case "strikethrough":
        return <StrikethroughIcon />;
      case "underline":
        return <UnderlineIcon />;
      default:
        return null;
    }
  };

  const onClick = (e, format) => {
    e.preventDefault();
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(format);
        switch (format) {
          case "bold":
            return setIsBold(selection.hasFormat("bold"));
          case "italic":
            return setIsItalic(selection.hasFormat("italic"));
          case "strikethrough":
            return setIsStrikethrough(selection.hasFormat("strikethrough"));
          case "underline":
            return setIsUnderline(selection.hasFormat("underline"));
          default:
            return null;
        }
      }
    });
  };

  const supportedTextFormats = ["bold", "italic", "underline", "strikethrough"];
  return (
    <>
      {supportedTextFormats.map((format) => (
        <ToolbarButton
          key={format}
          className={
            (format === "bold" && isBold) ||
            (format === "italic" && isItalic) ||
            (format === "underline" && isUnderline) ||
            (format === "strikethrough" && isStrikethrough)
              ? "active"
              : ""
          }
          onClick={(e) => {
            onClick(e, format);
          }}
        >
          {getIcon(format)}
        </ToolbarButton>
      ))}
    </>
  );
}

function ListToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <>
      <ToolbarButton
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
        }}
      >
        <ListBulletIcon />
      </ToolbarButton>
    </>
  );
}

export function ToolbarPlugin() {
  return (
    <Toolbar.Root className="toolbarRoot">
      <TextFormatToolbarPlugin />
      <ListToolbarPlugin />
    </Toolbar.Root>
  );
}
