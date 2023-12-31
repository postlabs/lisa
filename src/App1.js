// import logo from "./logo.svg";
import "./App.css";

import PathChip from "./components/PathChip";
import Tooltip from "./components/Tooltip";
import Text_delete_14 from "./svg/Text_delete_14";
import RankingFrame from "./components/RankingFrame";

function App() {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <div style={{  width: "1200px", height: "300px", background:"#D9D9"}}>
        App1

        {
          false &&
          <div>
            <RankingFrame data={[
              {ranking: '공동 1등', nickname: '알아서뭐하시게요', questionCount: 99999999999},
              {ranking: '공동 1등', nickname: '라벨라벨라벨라벨링', questionCount: 999999},
              {ranking: '2등', nickname: '텀블러', questionCount: 99998},
              {ranking: '3등', nickname: '마우스는로지텍', questionCount: 9996},
              {ranking: '', nickname: '오늘점심짜장면', questionCount: 94},
            ]} />
          </div>
        }

        {
          false &&
          <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop: '120px'}}>

          <br /><br />
          <Tooltip
            direction={"south"}
            arrowLocation={2}
            text={
              <div>
                이런 식의 사용이 가능합니다.
                <br/>
                개행도 가능합니다.
              </div>
            }
            target={<button id="target">TOOL<br/>TIP </button>} // target 은 id='target' 을 속성으로 가져야 합니다.
            gap={10}
            move={0}
            // icon={<Text_delete_14 />}
            initialExposure={true}
          />

          </div>
        }

        {
          false &&
          <div>
        
          <br /><br />
          <PathChip
            style={{posiiton: "absolute"}}
            bgColor={{ background: "pink" }}
            color={{ color: "red" }}
            // size={browserWidth > 791 ? "medium" : "tiny"}
            text="라벨"
          />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
