import { Link } from 'react-router-dom';
import './Gaide.css';
import imgGaide4 from '../../assets/images/gaide-4.png';

function Gaide4() {
    return (
        <div className="tips-page-wrapper">
            <main className="main-content">
                <article className="tip-article">
                    <h1>타이어 체인 관리 및 이용 가이드</h1>
                    <img src={imgGaide4} alt="타이어 체인" className="hero-image" />
                    <div className="article-body">
                        <p>겨울철 눈길 운전의 필수 안전장비가 바로 <strong>타이어 체인</strong>입니다.</p>
                        <p><strong>1️⃣ 언제 쓰나요?</strong><br />눈이 5cm 이상 쌓였거나 빙판길, 경사로, 체인 장착 의무 구간에서 사용하세요.</p>
                        <p><strong>2️⃣ 체인 종류</strong><br />금속 체인은 튼튼하지만 장착이 어렵고, 고무/벨트형은 장착이 쉬워 초보자에게 좋습니다.</p>
                        <p><strong>3️⃣ 주의사항</strong><br />눈이 없는 도로에서는 즉시 제거해야 타이어 손상을 막을 수 있습니다. 장착 후에는 시속 50km 이하로 서행하세요.</p>
                        <div style={{background:'#e7f5ff', padding:'15px', borderRadius:'8px', marginTop:'20px'}}>
                            <strong>💡 요약:</strong> 눈길 필수템! 사용 후에는 깨끗이 씻어 건조해 보관하세요.
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
export default Gaide4;