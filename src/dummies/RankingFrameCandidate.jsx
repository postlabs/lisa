import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from "styled-components";
import { Header24, Header20, Header16, Body14, Body12 } from "../styles/typography";
import RankingItem from './RankingItem';

const RankingFrame = ({data}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  const convertRankingNumToString = (options) => {
    switch(options) {
      case 1: return 'first';
      case 2: return 'second';
      case 3: return 'third';
      default: return 'others';
    }
  };

  const handleResize = () => {
    if (document.documentElement.clientWidth < 791) setIsMobile(true);
    else setIsMobile(false);
  };

  window.addEventListener('resize', handleResize);
  
  useEffect(()=>{
    if (document.documentElement.clientWidth < 791) setIsMobile(true);
    else setIsMobile(false);
  }, [isMobile]);

  return (
    <StyledRankingFrame isMobile={isMobile}>
      <div className='ranking-header'>
        <div className='ranking-title'>
          최저가 퀴즈 명예의 전당
        </div>
        <div className='ranking-subtitle'>
          가입 회원님들의 퀴즈 랭킹!
        </div>
      </div>
      <div className='ranking-content'>
        <RankingItem ranking={convertRankingNumToString(data[0].ranking)} isTied={data[0].isTied} nickname={data[0].nickname} questionCount={data[0].questionCount} isMobile={isMobile} />
        <RankingItem ranking={convertRankingNumToString(data[1].ranking)} isTied={data[1].isTied} nickname={data[1].nickname} questionCount={data[1].questionCount} isMobile={isMobile} />
        <RankingItem ranking={convertRankingNumToString(data[2].ranking)} isTied={data[2].isTied} nickname={data[2].nickname} questionCount={data[2].questionCount} isMobile={isMobile} />
        <RankingItem ranking={convertRankingNumToString(data[3].ranking)} isTied={data[3].isTied} nickname={data[3].nickname} questionCount={data[3].questionCount } isMobile={isMobile} />
        <RankingItem ranking={convertRankingNumToString(data[4].ranking)} isTied={data[4].isTied} nickname={data[4].nickname} questionCount={data[4].questionCount} isMobile={isMobile} />
      </div>
    </StyledRankingFrame>
  );
};

const StyledRankingFrame = styled.div`
  width: 100%;
  justify-content: center;
  text-align: center;
  position: relative;
  
  // align-items: flex-start;
  gap: 4px;
  
  @media (max-width: 791px) {
    align-items: center;
    gap: 10px;
    overflow: auto;
  }
  
  .ranking-title {
    padding-bottom: 10px; 
    ${Header24}

    @media (max-width: 791px) {
      padding-bottom: 6px;
      ${Header20}
      overflow: auto;
    }
  }
  
  .ranking-header {
    text-align: center;
    margin-top: 16px;
    margin-bottom: 16px;

    @media (max-width: 791px) {
      float: left;
      overflow: auto;
    }
  }

  .ranking-subtitle {
    color: grey;
    ${Body14}

    @media (max-width: 791px) {
      float: left;
      overflow: auto;
    }
  }
  
  .ranking-content {
    margin-top: 20px;
    white-space: nowrap;

    @media (max-width: 791px) {
      float: left;
      overflow: auto;
      left: 0px;
    }
  }

  .ranking-content::-webkit-scrollbar {
    display: none;
  }
`;

export default RankingFrame;