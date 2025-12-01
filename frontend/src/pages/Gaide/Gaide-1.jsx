import { Link } from 'react-router-dom';
import './Gaide.css';
import imgGaide1 from '../../assets/images/gaide-1.png';

function Gaide1() {
    return (
        <div className="tips-page-wrapper">
            <main className="main-content">
                <article className="tip-article">
                    <h1>초보 운전자를 위한 타이어 관리 가이드</h1>
                    <img src={imgGaide1} alt="타이어 관리" className="hero-image" />
                    <div className="article-body">
                        <p>타이어는 자동차와 도로가 맞닿는 유일한 부분으로, <strong>안전과 연비에 직접적인 영향</strong>을 줍니다.</p>
                        <p><strong>1️⃣ 공기압 확인</strong><br />타이어 공기압은 <b>한 달에 한 번</b> 이상 확인하세요. 적정 공기압은 보통 운전석 문 옆 스티커에 표시되어 있습니다.</p>
                        <p><strong>2️⃣ 마모 상태 점검</strong><br />타이어 홈 깊이가 <b>1.6mm 이하</b>로 줄면 교체해야 합니다. 500원짜리 동전을 홈에 넣었을 때 절반 이상 보이면 교체 시기예요.</p>
                        <p><strong>3️⃣ 위치 교환</strong><br />앞뒤 타이어의 마모 속도를 균일하게 하기 위해 <b>10,000km마다</b> 위치를 교환해주는 것이 좋습니다.</p>
                        <div style={{background:'#e7f5ff', padding:'15px', borderRadius:'8px', marginTop:'20px'}}>
                            <strong>💡 요약:</strong> 한 달에 한 번 공기압 확인, 10,000km마다 위치 교환, 마모 1.6mm 이하 시 교체하세요!
                        </div>
                    </div>
                </article>
            </main>

            <aside className="sidebar">
                <div className="widget">
                    <h3>카테고리</h3>
                    <ul>
                        <li><Link to="/guide">🔧 엔진 오일</Link></li>
                        <li><Link to="/guide-1">🚗 타이어 관리</Link></li>
                        <li><Link to="/guide-2">❄️ 계절별 관리</Link></li>
                    </ul>
                </div>
                <div className="widget">
                    <h3>인기 꿀팁</h3>
                    <ul>
                        <li><Link to="/guide">1. 엔진오일 교환 주기</Link></li>
                        <li><Link to="/guide-3">2. 타이어 적정 공기압</Link></li>
                        <li><Link to="/guide-4">3. 겨울철 스노우 체인</Link></li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
export default Gaide1;