import { head } from 'lodash';
import { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components';
import Editor from '../../components/Editor'
import { debouncer } from '../../utils/debouncer';

const EditorSpace = styled.div`
  display: flex;
  height: calc(100vh - 58.96px);
`;

const EditorSection = styled.div`
  display: flex;  
  flex-direction: column;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 20px;
    height: 100%;
    background-color: ${prop => prop.theme.colors.quaternary};
    cursor: ew-resize;
  }
`;

const EditorResult = styled.iframe`
  flex: 1;
  background-color: #FFF;
  border: none;
`;

const Space = () => {
  let pos = 0;
  const headerHeight = 47.08;
  const [width, setWidth] = useState(300);
  const [code, setCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  const [editorPos, setEditorPos] = useState({
    css: {
      top: headerHeight,
      minTop: headerHeight
    },
    js: {
      top: headerHeight * 2,
      minTop: headerHeight * 2
    }
  })
  const editorContainerRef = useRef(null)
  const editorSectionRef = useRef(null);
  const editorResultRef = useRef(null);

  useEffect(() => {
    debouncer(
      () => runCode(),
      500,
      "run-code"
    );
  }, [code])

  const dragBorder = e => {
    const dx = e.clientX - pos;
    pos = e.clientX;
    setWidth(prevState => prevState + dx);
  }

  const checkDraggableBorder = e => {
    if (width - e.nativeEvent.offsetX < 20) {
      pos = e.nativeEvent.x;
      window.addEventListener("mousemove", dragBorder, false);
      window.addEventListener("mouseup", function() {
        window.removeEventListener("mousemove", dragBorder, false);
      }, false);
    }
  }
  
  const updateCode = e => {
    setCode(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const dragEditor = (e, key) => {
    const dy = e.clientY - pos;
    pos = e.clientY;
    if(dy < 0) {
      if(key === 'css') {
        setEditorPos(prevState => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            top: Math.max(prevState[key].minTop, prevState[key].top + dy)
          }
        }));
      }
      else {
        setEditorPos(prevState => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            top: Math.max(prevState.css.top + headerHeight, prevState[key].top + dy)
          }
        }));
      }
    }
    else {
      if(key === 'css') {
        setEditorPos(prevState => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            top: Math.min(prevState.js.top - headerHeight, prevState[key].top + dy)
          }
        }));
      }
      else {
        setEditorPos(prevState => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            top: Math.min(editorContainerRef.current.clientHeight - headerHeight, prevState[key].top + dy)
          }
        }));
      }
    }
  }

  const checkDraggableEditor = (e, key) => {
    if(key !== 'html') {
      function dragEditorTrigger(e) {
        dragEditor(e, key)
      }
      pos = e.nativeEvent.y;
      window.addEventListener("mousemove", dragEditorTrigger, false);
      window.addEventListener("mouseup", function() {
        window.removeEventListener("mousemove", dragEditorTrigger, false);
      }, false);
    }
  }

  const runCode = () => {
    editorResultRef.current.contentWindow.document.body.innerHTML = code.html + `<style>${code.css}</style>`;
    editorResultRef.current.contentWindow.eval(code.js)
  }

  return (
    <EditorSpace ref={editorContainerRef}>
      <EditorSection ref={editorSectionRef} style={{ width }} onMouseDown={checkDraggableBorder}>
        <Editor
          header="HTML"
          name="html"
          value={code.html}
          onChangeHandler={updateCode}
        />
        
        <Editor
          header="CSS"
          name="css"
          value={code.css}
          onChangeHandler={updateCode}
          top={editorPos.css.top}
          handleOnMouseDown={checkDraggableEditor}
        />

        <Editor
          header="JS"
          name="js"
          value={code.js}
          onChangeHandler={updateCode}
          top={editorPos.js.top}
          handleOnMouseDown={checkDraggableEditor}
        />
      </EditorSection>
      <EditorResult ref={editorResultRef} />
    </EditorSpace>
  )
}

export default Space
