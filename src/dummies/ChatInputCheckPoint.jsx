import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Body14, Body12 } from "../styles/typography";
import ChatInput_send_button from "../svg/ChatInput_send_button";

const ChatInput = (props) => {
  // textarea 메시지 관련 코드
  const [message, setMessage] = useState('');
  const handleMessageChange = (e)=>{
    setMessage(e.target.value);
  };
  
  // 버튼 활성화 관련 코드
  const [buttonActivate, setButtonActivate] = useState(false);
  useEffect(() => {
    if (message.length > 0) setButtonActivate(true);
    else setButtonActivate(false);
  }, [message]);

  // 브라우저 너비 관련 코드
  const [browserWidth, setBrowserWidth] = useState(document.documentElement.clientWidth);
  const resizeTimer = useRef(null);
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
  }, [browserWidth]);

  return (
    <StyledChatInput browserWidth={browserWidth}>
      <div className="chat-input-wrapper">
        <div className="chat-input">

          {/* 메시지 입력 부분 */}
          <div className="chat-input-text-wrapper">
            <div
              contentEditable="true"
              className="chat-input-text"
              id="chat-input-text"
              value={message}
              onChange={handleMessageChange}
              rows="1"
            />
          </div>
          
          {/* 메시지 전송 부분 */}
          <ChatInput_send_button
            className="chat-input-button"
            id="chat-input-button"
            color={buttonActivate ? '#7B33FF' : '#EBEBEB'}
          />

        </div>
      </div>
    </StyledChatInput>
  );
};

const StyledChatInput = styled.div`
  .chat-input-wrapper {
    display: flex;
    border-top: 1px solid #EBEBEB;
    position: absolute;
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

  
  .chat-input-text-wrapper{
    display: flex;
    

    .chat-input-text {
      width: ${(props)=>(props.browserWidth > 791) ? 791 - (28 + 14 + 36 + 10) : (props.browserWidth - 28 - 14 - 36 - 10)}px;
      border-radius: 10px;
      border: 1px solid #EBEBEB;
      margin-right: 10px;
      min-height: 36px;
      padding: 10px 12px;
      top:50%;
   
      ${ Body14 }
    }
  }
  
  .chat-input-button {
    width: 36px;
    height: 36px;
    margin: 0px;
    padding: 0px;
    bottom: 0;
  }
`;

export default ChatInput;