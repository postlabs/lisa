import React, { useState, useEffect } from 'react';
import styled, {css} from "styled-components";
import { Header24, Header20, Body14, Body12,  } from "../styles/typography";
import PathChip from './PathChip';
// import { Header16 } from "../styles/typography";

export const Header16 = css`
  font-size: 16;
  font-family: "Pretendard Bold";
  line-height: 23px;
  font-weight: 700px;
  font-style: normal;
`;

const rankingBackground = (options) => {
  switch (options) {
    case 'first':
      return '#EEE5FF';
    case 'second':
      return '#ECF1FD';
    case 'third':
      return '#FFEBED';
    default:
      return '#F8F8F8';
  }
};

const rankingIconsWeb = (options) => {
  switch (options) {
    case 'first':
      return 'rankingIcons/Whale_Web.png';
    case 'second':
      return 'rankingIcons/Seal_Web.png';
    case 'third':
      return 'rankingIcons/Octopus_Web.png';
    default:
      return 'rankingIcons/Fish_Web.png';
  }
};

const rankingIconsMobile = (options) => {
  switch (options) {
    case 'first':
      return 'rankingIcons/Whale_Mobile.png';
    case 'second':
      return 'rankingIcons/Seal_Mobile.png';
    case 'third':
      return 'rankingIcons/Octopus_Mobile.png';
    default:
      return 'rankingIcons/Fish_Mobile.png';
  }
};

const rankingText = (options, isTied) => {
  switch (options) {
    case `first`:
      return `${(isTied)?'공동':''} 1등`;
    case `second`:
      return `${(isTied)?'공동':''} 2등`;
    case `third`:
      return `${(isTied)?'공동':''} 3등`;
    default:
      return ;
  }
};

const RankingItem = ({
  ranking,        // 등수 >>> first | second | third | others
  isTied,         // 공동 여부 >>> true | false
  nickname,       // 사용자 닉네임
  questionCount,  // 맞춘 문제 수 >>> 99998
  isMobile,       // 모바일 여부
}) => {
  const [pathChipSize, setPathChipSize] = useState('medium');
  
  useEffect(()=>{
    if (isMobile) {
      setPathChipSize('tiny');
    }
    else {
      setPathChipSize('medium');
    }
  });

  if (questionCount > 9_999_999) { questionCount = 9_999_999; }
  const questionCountString = questionCount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <StyledRankingItem
      ranking={ranking}
      isTied={isTied}
      nickname={nickname}
      questionCountString={questionCountString}
      isMobile={isMobile}
    >
      <div className="ranking-image" style={{position: "relative"}}>
        {((ranking) === 'first'
        || (ranking) === 'second'
        || (ranking) === 'third') &&
          <PathChip
            className="show-chip"
            style={{position: "absolute", top: "0px", left: "0px"}} 
            bgColor={{background: "#E8F8F0"}}
            color={{color: "#15BD66"}}
            size={pathChipSize}
            text={rankingText(ranking, isTied)}
          />
        }
        <img
          className="ranking-image-icon"
          src={(isMobile) ? rankingIconsMobile(ranking) : rankingIconsWeb(ranking)}
          alt='rankingIcon'
        />
      </div>
      <div className='ranking-content'>
        <div className='ranking-nickname'>{nickname}</div>
        <div className='ranking-question-count'>{questionCountString} 문제 맞춤</div>
      </div>
    </StyledRankingItem>
  );
};

const StyledRankingItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  
  .ranking-image {
    background-color: ${(props)=>rankingBackground(props.ranking)};
    border-radius: 50%;
    width: ${(props)=>(props.isMobile) ? '120px': '140px'};
    height: ${(props)=>(props.isMobile) ? '120px': '140px'};
    margin-left: ${(props)=>(props.isMobile) ? '10px': '30px'};
    margin-right: ${(props)=>(props.isMobile) ? '10px': '30px'};

    .ranking-image-icon {
      width: ${(props)=>(props.isMobile) ? '60px' : '70px'};
      height: ${(props)=>(props.isMobile) ? '60px' : '70px'};
      position: relative;
      top: 25%;
    }
  }

  .ranking-content {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .ranking-nickname {
    ${((props)=>{
      if (props.isMobile) {
        return Header16;
      }
      else {
        return Header20;
      }
    })}
  }

  .ranking-question-count {
    ${(props)=>((props.isMobile) ? Body12 : Body14)}
  }
`;
  
export default RankingItem;