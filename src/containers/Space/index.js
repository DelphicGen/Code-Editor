import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
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
  const [width, setWidth] = useState(300);
  const [code, setCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  const editorSectionRef = useRef(null);
  const editorResultRef = useRef(null);

  useEffect(() => {
    debouncer(
      () => runCode(),
      500,
      "run-code"
    );
  }, [code])

  const resize = e => {
    const dx = e.clientX - pos;
    pos = e.clientX;
    setWidth(prevState => prevState + dx);
  }

  const checkDraggableBorder = e => {
    if (width - e.nativeEvent.offsetX < 20) {
      pos = e.nativeEvent.x;
      window.addEventListener("mousemove", resize, false);
      window.addEventListener("mouseup", function() {
        window.removeEventListener("mousemove", resize, false);
      }, false);
    }
  }
  
  const updateCode = e => {
    setCode(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const runCode = () => {
    editorResultRef.current.contentWindow.document.body.innerHTML = code.html + `<style>${code.css}</style>`;
    editorResultRef.current.contentWindow.eval(code.js)
  }

  return (
    <EditorSpace>
      <EditorSection ref={editorSectionRef} style={{ width }} onMouseDown={checkDraggableBorder}>
        <Editor header="HTML" name="html" value={code.html} onChangeHandler={updateCode} />
        <Editor header="CSS" name="css" value={code.css} onChangeHandler={updateCode} />
        <Editor header="JS"name="js" value={code.js} onChangeHandler={updateCode} />
      </EditorSection>
      <EditorResult ref={editorResultRef} />
    </EditorSpace>
  )
}

export default Space
