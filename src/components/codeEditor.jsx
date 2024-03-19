import React, { useState, useEffect } from 'react';

const CodeEditor = () => {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- Bootstrap 5 CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1>Hello, world!</h1>
    <p>This is a boilerplate HTML code.</p>
  </div>
</body>
</html>`);

  const [output, setOutput] = useState('');
  const [isHorizontal, setIsHorizontal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOutput(code);
    }, 500);

    return () => clearTimeout(timer);
  }, [code]);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const toggleLayout = () => {
    setIsHorizontal((prevState) => !prevState);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd, value } = e.target;
      const newValue = value.substring(0, selectionStart) + '    ' + value.substring(selectionEnd);
      setCode(newValue);
    }
  };


  return (
    <div className="code-editor" style={{ height: '100vh', display: 'flex', flexDirection: isHorizontal ? 'row' : 'column' }}>
      <div className="editor-container" style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <h4>Code Editor</h4>
        <textarea
          className="form-control flex-grow-1"
          rows="10"
          style={{ backgroundColor: 'black', color: 'white', border: 'none', resize: 'none', padding: '10px', height: '100%' }}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
      <div className="output-container" style={{ flex: '1' }}>
        <h4>Output</h4>
        <iframe
          title="output"
          srcDoc={output}
          style={{ width: '100%', height: '100%', border: '1px solid #ccc' }}
          spellCheck='false'
        ></iframe>
      </div>
      <button className='btn btn-dark' onClick={toggleLayout} style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: '9999' }}>
        Toggle Layout
      </button>
    </div>
  );
};

export default CodeEditor;
