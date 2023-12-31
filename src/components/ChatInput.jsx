import React, { useState, useEffect, useRef } from "react";
import styled, {css} from "styled-components";
import { Body14, Body12 } from "../styles/typography";
import ChatInput_send_button from "../svg/ChatInput_send_button";
// import useInput from "../hooks/useInput";

const ChatInput = ({maxLength, value, setValue, isFocused, setIsFocused, inputRef, buttonClick, placeHolder}) => {
  // const { value, setValue, isFocused, setIsFocused, inputRef } = useInput();

  // const editableRef = useRef(null);           // inputRef와 대응
  const resizeTimer = useRef(null);
  // const [message, setMessage] = useState(''); // value, setValue와 대응
  const [buttonActivate, setButtonActivate] = useState(false);
  const [browserWidth, setBrowserWidth] = useState(document.documentElement.clientWidth);
  // const [dontSummarizeInput, setDontSummarizeInput] = useState(true);  // isFocused와 대응
  
  const handleMessageChange = (e)=>{
    // 글자 수 제한
    const maxCharacters = maxLength;
    const text = inputRef.current.innerText;
    if (text.length > maxCharacters) {
      inputRef.current.innerText = text.slice(0, maxCharacters);
    }
    
    // 메시지 관련 코드 : 개행 및 띄어쓰기 대응
    // setValue(e.target.innerHTML.replaceAll('</div>', '').replaceAll('<div><br>', '\n').replaceAll('<div>', '\n').replaceAll('&nbsp', ' '));
    setValue(e.target.innerText);
    // console.log(value, '>>>', value.length);
  };

  useEffect(() => {
    // 버튼 활성화 관련 코드
    if (value.length >= maxLength) setButtonActivate(false);
    else if (value.length > 0) setButtonActivate(true);
    else setButtonActivate(false);

    // 텍스트 방어 관련 코드
    const defenseTyping = (event) => {
      const forbiddenKeys = ['Backspace', 'Delete', 'Enter']; // 타자 입력을 막을 키
      if ((value.length >= maxLength) && !(forbiddenKeys.includes(event.key))) {
        event.preventDefault();

        // alert 코드는 여기에 들어가야 합니다
        alert(`최대 ${maxLength}글자까지만 남기실 수 있습니다.`);
      }
    }

    document.addEventListener('keydown', defenseTyping);
    
    return () => {
      document.removeEventListener('keydown', defenseTyping);
    };
  }, [value, buttonActivate]);

  // 브라우저 너비 관련 코드
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimer.current !== null) return;
      resizeTimer.current = setTimeout(() => {
        resizeTimer.current = null;
        setBrowserWidth(window.innerWidth);
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [browserWidth, value]);

  // 다른 영역 클릭 시 줄이기
  useEffect(()=>{
    document.addEventListener('click', (e)=>{
      if (e.target.id !== 'chat-input-text') {
        setIsFocused(false);
      }
      else {
        if (!isFocused) {
          setIsFocused(true);
        }
      }
    });
  }, [isFocused]);

  // 붙여넣기 대응
  useEffect(()=>{
    const handlePaste = (event) => {
      event.stopPropagation();
      event.preventDefault();

      let pastedText = '';
      if (event.clipboardData && event.clipboardData.getData) {
        pastedText = event.clipboardData.getData('text/plain');
        document.getElementById('chat-input-text').innerText += pastedText;
        event.clipboardData.clearData();
      }
    };

    document.addEventListener('paste', handlePaste, {once: true});

    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  });

  return (
    <StyledChatInput browserWidth={browserWidth} isFocused={isFocused}>
      <div className="chat-input-wrapper">
        <div className="chat-input">

          <div className="chat-input-text-wrapper">
            {/* 메시지 입력 부분 */}
            <div
              contentEditable="true"
              className="chat-input-text"
              id="chat-input-text"
              value={value}
              ref={inputRef}
              onInput={handleMessageChange}
              rows="1"
              placeholder={placeHolder}
            />
          </div>

          <div className="chat-input-button-wrapper">
            {/* 메시지 전송 부분 */}
            <ChatInput_send_button
              onClick={() => 
                {
                  buttonClick();
                  document.getElementById('chat-input-text').innerText = null;
                  setValue('');
                }
              }
              className="chat-input-button"
              id="chat-input-button"
              color={buttonActivate ? '#7B33FF' : '#EBEBEB'}
            />
          </div>

        </div>
      </div>
    </StyledChatInput>
  );
};

const StyledChatInput = styled.div`
  .chat-input-wrapper {
    display: flex;
    border-top: 1px solid #EBEBEB;
    background-color: white;
    position: fixed;
    bottom: 0px;
    width: ${(props)=>(props.browserWidth > 791) ? 791 : props.browserWidth}px;
    
    .chat-input {
      display: flex;
      align-items: center;
      padding: 7px 14px;
      width: 100%;
      margin: 0 5px;
    }
  }

  .chat-input-text-wrapper {
    .chat-input-text {
      width: ${(props)=>(props.browserWidth > 791) ? 791 - (28 + 32 + 36 + 10) : (props.browserWidth - 28 - 32 - 36 - 10)}px;
      border-radius: 10px;
      border: 1px solid #EBEBEB;
      margin-right: 10px;
      padding: 8px 12px;
      min-height: 14px;
      max-height: 76px;
      outline: 0px solid transparent;
      ${ Body14 };

      ${(props)=>
        (props.isFocused) &&
        css`
        overflow-y: scroll;
        `
      }

      ${(props)=>
        !(props.isFocused) &&
        css`
        overflow-y: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        `
      }
    }

    .chat-input-text::-webkit-scrollbar {
      display: none;
    }
  }

  .chat-input-button-wrapper {
    position: absolute;
    bottom: 9px;
    right: 14px;
    width: 36px;
    height: 36px;
    margin: 0px;
    padding: 0px;

    .chat-input-button {
      
    }
  }

  [placeholder]:empty::before {
    content: attr(placeholder);
    color: #C2C2C2; 
  }

  [placeholder]:empty:focus::before {
      content: "";
  }
`;

export default ChatInput;