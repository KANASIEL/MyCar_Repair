import { Link } from 'react-router-dom';
import './Gaide.css';
import imgGaide from '../../assets/images/gaide.png';

function Gaide() {
    return (
        <div className="tips-page-wrapper">
            <main className="main-content">
                <article className="tip-article">
                    <h1>초보 운전자를 위한 엔진오일 교환 주기 완벽 가이드</h1>
                    <img src={imgGaide} alt="엔진오일" className="hero-image" />
                    <div className="article-body">
                        <p>엔진오일은 자동차의 ‘피’라고 불릴 만큼 중요합니다. 엔진의 마찰을 줄이고, 열을 식히며, 내부를 깨끗하게 유지하는 역할을 하죠.</p>
                        <p><strong>교환 주기</strong>는 일반적으로 <b>5,000~10,000km</b> 또는 <b>6개월마다</b>가 좋습니다. 시내주행이 많다면 기간 기준으로 교체하는 게 안전합니다.</p>
                        <p>오일 종류는 <b>광유(5,000km)</b>, <b>반합성유(7,000km)</b>, <b>합성유(10,000km 이상)</b>로 구분되며, 초보자는 반합성유가 가장 무난합니다.</p>
                        <p>오일색이 <b>검게 변하거나</b> <b>소음·진동이 증가</b>하면 교체 시기예요. 교환 시에는 <b>오일필터도 함께</b> 바꾸는 걸 잊지 마세요.</p>
                        <div style={{background:'#e7f5ff', padding:'15px', borderRadius:'8px', marginTop:'20px'}}>
                            <strong>💡 요약:</strong> 6개월 또는 5,000~10,000km마다 엔진오일과 필터를 함께 교환하면 차 수명과 연비가 모두 좋아집니다 🚗
                        </div>
                    </div>
                </article>
            </main>

            {/* 공통 사이드바 (링크 소문자로 수정됨) */}
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
export default Gaide;