import { Link } from 'react-router-dom';
import './Gaide.css';
import imgGaide2 from '../../assets/images/gaide-2.png';

function Gaide2() {
    return (
        <div className="tips-page-wrapper">
            <main className="main-content">
                <article className="tip-article">
                    <h1>초보 운전자를 위한 계절별 자동차 관리</h1>
                    <img src={imgGaide2} alt="계절별 관리" className="hero-image" />
                    <div className="article-body">
                        <p>자동차는 계절에 따라 관리 포인트가 달라집니다. 초보 운전자라면 <strong>계절별 점검만 잘해도 차량 수명과 안전</strong>을 지킬 수 있어요.</p>
                        <p><strong>🌸 봄</strong><br />겨울철 먼지와 염분 세차, 에어컨 필터/와이퍼 교체.</p>
                        <p><strong>☀️ 여름</strong><br />냉각수(부동액) 확인, 에어컨 가스 점검, 타이어 공기압 체크.</p>
                        <p><strong>🍁 가을</strong><br />배터리 상태 점검, 타이어 마모 확인, 워셔액 보충.</p>
                        <p><strong>❄️ 겨울</strong><br />배터리 방전 주의, 부동액 농도 확인, 스노우 타이어/체인 준비.</p>
                        <div style={{background:'#e7f5ff', padding:'15px', borderRadius:'8px', marginTop:'20px'}}>
                            <strong>💡 요약:</strong> 계절이 바뀔 때마다 차량을 한 번씩 점검하는 습관을 들이세요!
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
export default Gaide2;