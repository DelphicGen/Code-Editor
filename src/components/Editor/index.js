import { useRef, useState } from 'react';
import styled from 'styled-components'

const EditorContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const EditorHeader = styled.h2`
  background-color: ${prop => prop.theme.colors.primary};
  color: ${prop => prop.theme.colors.secondary};
  padding: 8px;
  cursor: move;
`;

const EditorTextarea = styled.textarea`
  background-color: ${prop => prop.theme.colors.quaternary};
  border: none;
  color: ${prop => prop.theme.colors.secondary};
  width: 100%;
  height: calc(100% - 47.08px);
  padding: 12px 20px;
  font-size: 16px;
  resize: none;
  overflow-y: auto;
  &:focus {
    outline: none;
  } 
`;

const Editor = (props) => {
  const headerRef = useRef(null);
  const textareaRef = useRef(null);
  const handleTabKey = e => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const value = textareaRef.current.value;
      const selectionStart = textareaRef.current.selectionStart;
      const selectionEnd = textareaRef.current.selectionEnd;
      textareaRef.current.value = value.substring(0, selectionStart) + '  ' + value.substring(selectionEnd);
      textareaRef.current.selectionStart = selectionStart + 2;
      textareaRef.current.selectionEnd = selectionStart + 2;
    }
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const value = textareaRef.current.value;
      const selectionStart = textareaRef.current.selectionStart;
      const selectionEnd = textareaRef.current.selectionEnd;
  
      const beforeStart = value
        .substring(0, selectionStart)
        .split('')
        .reverse()
        .join('');
      const indexOfTab = beforeStart.indexOf('  ');
      const indexOfNewline = beforeStart.indexOf('\n');
  
      if (indexOfTab !== -1 && (indexOfTab < indexOfNewline || indexOfNewline === -1)) {
        textareaRef.current.value =
          beforeStart
            .substring(indexOfTab + 2)
            .split('')
            .reverse()
            .join('') +
          beforeStart
            .substring(0, indexOfTab)
            .split('')
            .reverse()
            .join('') +
          value.substring(selectionEnd);
  
        textareaRef.current.selectionStart = selectionStart - 2;
        textareaRef.current.selectionEnd = selectionEnd - 2;
      }
    }
  }

  return (
    <EditorContainer style={{ top: props.top }}>
      <EditorHeader ref={headerRef} onMouseDown={e => props.handleOnMouseDown(e, props.name)}>{ props.header }</EditorHeader>
      <EditorTextarea ref={textareaRef} onKeyDown={handleTabKey} name={props.name} value={props.value} onChange={props.onChangeHandler} />
    </EditorContainer>
  )
}

export default Editor
