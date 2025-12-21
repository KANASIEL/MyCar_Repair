# 🧑‍🔧 MyCar_Repair

![개발 기간](https://img.shields.io/badge/개발%20기간-2025.11.04%20~%202025.11.11%20&%202025.11.24%20~%202025.12.01-blue?style=flat-square)
![팀원 수](https://img.shields.io/badge/팀원-6명-green?style=flat-square)

<img width="541" height="174" alt="image" src="https://github.com/user-attachments/assets/27328293-6042-4416-a204-e713954550ff" />

## 📖 프로젝트 소개
MyCar_Repair는 카카오지도 API와 공공데이터를 활용해 전국 정비업체를 쉽게 검색하고 예약할 수 있는 플랫폼으로, 
차량 등록 시 정비 이력과 소모품 교체 주기를 관리하며, 예약 확정·완료·취소와 고객 리뷰 기능을 통해 차주와 업체를 편리하게 연결합니다.

### ⏰ 개발 기간
- 25.11.04 ~ 25.11.11  
- 25.11.24 ~ 25.12.01

### 👥 팀원 및 역할

| 이름   | 역할                                                                                           | GitHub |
|--------|------------------------------------------------------------------------------------------------|--------|
| 이현석 | **팀장** · 스프링 부트 포팅, 백엔드 구조 분리, 이미지 첨부, 서머노트 이미지·동영상 미리보기 기능 | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/leehyeonseok-NightTraveler) |
| 정태규 | DB 설계·구현(멤버십 자동관리), 마이페이지, 관리자 페이지(예약 관리), Q&A 기능 강화             | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/KANASIEL) |
| 김주현 | 소셜 로그인 구현, 회원정보 추가 페이지, 통합 회원가입 DB 연동(공동), 반려동물 몸무게 기록·그래프 | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/jh0317) |
| 김지호 | 소셜 로그인 구현, 회원정보 추가 페이지, 통합 회원가입 DB 연동(공동)                           | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/jiho6670) |
| 채교준 | DB 설계·구현, Gemini 기반 챗봇, ⚖ 반려동물 비만도 계산기                                          | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/lumineon213) |
| 구현서 | 이메일 인증 아이디·비밀번호 찾기, 검색 자동완성, 자유게시판 CRUD 및 댓글 기능                    | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/guhyeonseo) |


## 🛠 기술 스택

| 카테고리          | 기술 |
|-------------------|------|
| 운영체제 | ![Windows 11](https://img.shields.io/badge/Windows%2011-0078D6?style=flat&logo=windows11&logoColor=white) |
| 언어 | ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)&nbsp;![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |
| 프론트엔드 | ![JSP](https://img.shields.io/badge/JSP-000000?style=flat&logo=java&logoColor=white)&nbsp;![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white)&nbsp;![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white) |
| 백엔드 프레임워크 | ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=springboot&logoColor=white) |
| ORM / 데이터 접근 | ![MyBatis](https://img.shields.io/badge/MyBatis-000000?style=flat&logo=mybatis&logoColor=white) |
| 데이터베이스 | ![Oracle](https://img.shields.io/badge/Oracle-F80000?style=flat&logo=oracle&logoColor=white) |
| 인증 / 보안 | ![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=flat&logo=springsecurity&logoColor=white)&nbsp;![Kakao](https://img.shields.io/badge/Kakao-FFCD00?style=flat&logo=kakaotalk&logoColor=black)&nbsp;![Google](https://img.shields.io/badge/Google-EA4335?style=flat&logo=google&logoColor=white)&nbsp;![Naver](https://img.shields.io/badge/Naver-03C75A?style=flat&logo=naver&logoColor=white) |
| AI / 외부 API | ![Google Gemini](https://img.shields.io/badge/Google%20Gemini-886FBF?style=flat&logo=googlegemini&logoColor=white) |
| 개발 도구 / IDE | ![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=flat&logo=intellijidea&logoColor=white)&nbsp;![STS](https://img.shields.io/badge/Spring%20Tool%20Suite-6DB33F?style=flat&logo=spring&logoColor=white)&nbsp;![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white) |

## 🔄 서비스 이용 흐름  

1️⃣ 사용자는 소셜 로그인(Kakao / Google / Naver)을 통해 회원가입  
2️⃣ 추가 정보 입력 후 반려동물 정보 등록  
3️⃣ 진료·미용 예약 또는 커뮤니티 이용  
4️⃣ Gemini AI 챗봇을 통한 반려동물 상담  
5️⃣ 마이페이지에서 몸무게·건강 정보 관리  
6️⃣ 관리자는 관리자 페이지에서 예약·회원 관리

## 🖼 주요 화면

<details>
<summary>🏠 메인 페이지</summary>

<img width="2879" height="1464" alt="image" src="https://github.com/user-attachments/assets/9a9f71d9-5567-46f0-8eba-3b89d01dd764" />  
반려인을 위한 따뜻한 첫인상을 주는 랜딩 페이지로, 서비스 소개, 빠른 예약 버튼, 커뮤니티 바로가기 등을 한눈에 제공합니다.

</details>

<details>
<summary>🔐 소셜 로그인 및 회원가입</summary>

<img width="2879" height="1470" alt="image" src="https://github.com/user-attachments/assets/5a76e393-02b6-469c-8181-a24dc20988e4" />  
Kakao, Google, Naver 소셜 로그인을 지원하며, 추가 정보 입력 후 통합 회원가입이 가능합니다.

</details>

<details>
<summary>🤖 Gemini AI 챗봇 상담</summary>
  
<img width="2879" height="1465" alt="image" src="https://github.com/user-attachments/assets/283259e9-06aa-46d2-a096-2bd2b3844e45" />  
Google Gemini API를 활용한 실시간 챗봇으로, 반려동물 건강·영양 상담을 언제든지 받을 수 있습니다.

</details>

<details>
<summary>⚖ 반려동물 비만도 계산기</summary>

<img width="2879" height="1462" alt="image" src="https://github.com/user-attachments/assets/aed471e9-8e43-405c-8b3c-d213b2440531" />  
보화작 눈으로 본 반려동물의 체형을 사진에서 골라 입력하면 반려동물의 비만도를 진단하고 건강 조언을 제공합니다.

</details>

<details>
<summary>📈 몸무게 기록 및 그래프 시각화</summary>
  
<img width="2879" height="1470" alt="image" src="https://github.com/user-attachments/assets/7ca98007-e17a-42c2-bfb5-14e6d67ea88c" />  
마이페이지에서 반려동물의 몸무게 변화를 기간별로 기록하고, 직관적인 그래프로 확인할 수 있습니다.

</details>

<details>
<summary>✍ 자유게시판 글쓰기 (서머노트 에디터)</summary>

<img width="2879" height="1465" alt="image" src="https://github.com/user-attachments/assets/5ef736a5-b07a-4545-86dd-7b26b1cc6dab" />  
서머노트 에디터를 활용해 이미지·동영상 첨부와 미리보기가 가능한 풍부한 게시글 작성 기능을 지원합니다.

</details>

<details>
<summary>👤 마이페이지 및 🛠 관리자 페이지</summary>

<img width="2879" height="1463" alt="image" src="https://github.com/user-attachments/assets/b81f16c6-7042-4859-acd4-376e832a1ebc" />
<img width="2879" height="1435" alt="image" src="https://github.com/user-attachments/assets/9f89765b-88e7-4715-a1ee-0d9ffbd2bf09" />
<img width="2879" height="1463" alt="image" src="https://github.com/user-attachments/assets/f3346612-69d6-4178-ad69-4db0220a94ef" />
<img width="2879" height="1425" alt="image" src="https://github.com/user-attachments/assets/ac928d4e-d7fb-45a7-a06e-3f444379ab6e" />
<img width="2879" height="1463" alt="image" src="https://github.com/user-attachments/assets/14340719-0ced-46e4-884e-e321544d18ac" />
<img width="2879" height="1294" alt="image" src="https://github.com/user-attachments/assets/58ec3e52-86ae-4093-9c58-452925e6aa25" />

회원 정보 관리, 예약 내역 확인, 반려동물 정보 등록(마이페이지)과  
예약·회원 관리 기능(관리자 페이지)을 제공합니다.

</details>


## 🐞 이슈 발생 및 해결

### 📌 이슈 개요
- **발생 상황**: GitHub Pull Request 병합 과정
- **관련 브랜치**: `feature/*` → `develop`
- **증상**: 동일 파일 동시 수정으로 Merge Conflict 발생

### 🔍 원인 분석
- 동일 파일·동일 라인을 여러 명이 수정
- 최신 `develop` 미반영 상태에서 작업
- 작업 범위 공유 부족

### 🛠 해결 방법
- 최신 브랜치 반영
  ```bash
  git pull origin develop

## 📊 프로젝트 성과

- 6인 팀 프로젝트로 기획·개발·협업 전 과정 경험
- 소셜 로그인 및 통합 회원 시스템 안정적 구현
- 외부 AI API(Gemini) 연동 경험 확보
- Oracle 기반 실서비스 수준 DB 설계 및 운영 경험
- Git 협업 및 Merge Conflict 해결 경험 축적

## 🚀 개선 과제 및 향후 계획

- 모바일 반응형 UI 고도화
- 예약 알림(문자·푸시) 기능 추가
- 관리자 통계 대시보드 제공
- AI 상담 답변 품질 개선 및 로그 분석
