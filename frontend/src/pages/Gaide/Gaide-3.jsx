import { Link } from 'react-router-dom';
import './Gaide.css';
import imgGaide3 from '../../assets/images/gaide-3.png';

function Gaide3() {
    return (
        <div className="tips-page-wrapper">
            <main className="main-content">
                <article className="tip-article">
                    <h1>타이어 적정 공기압은?</h1>
                    <img src={imgGaide3} alt="타이어 공기압" className="hero-image" />
                    <div className="article-body">
                        <p>타이어 공기압은 <strong>주행 안정성과 연비, 타이어 수명</strong>을 좌우하는 핵심 요소입니다.</p>
                        <p><strong>1️⃣ 적정 공기압 확인법</strong><br />운전석 문 옆 스티커나 설명서를 확인하세요. 보통 승용차는 <b>32~35psi</b> 정도입니다.</p>
                        <p><strong>2️⃣ 공기압이 낮을 때</strong><br />연비가 나빠지고 타이어 마모가 빨라지며, 고속주행 시 위험합니다.</p>
                        <p><strong>3️⃣ 공기압이 높을 때</strong><br />승차감이 나빠지고 제동력이 감소하며, 중앙부 편마모가 생깁니다.</p>
                        <div style={{background:'#e7f5ff', padding:'15px', borderRadius:'8px', marginTop:'20px'}}>
                            <strong>💡 요약:</strong> 한 달에 한 번 점검하고, 여름엔 약간 낮게, 겨울엔 약간 높게 유지하세요!
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
export default Gaide3;