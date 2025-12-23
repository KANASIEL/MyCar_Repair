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
| 이현석 | **팀장** · 기능을 통합, React 전환, Spring Boot와 BCrypt 기반 보안 적용, <br>브랜치·Jira 구성, 전반적인 프로젝트 관리 | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/leehyeonseok-NightTraveler) |
| 정태규 | 공지사항 및 1대1문의 페이지 제작, React 기반으로 전환하여 관련 기능을 구현, <br>정비 이력과 소모품 관리 페이지를 포함한 관리 기능 전반 개발 | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/KANASIEL) |
| 김주현 | 회원가입 페이지와 관리자 전환 기능을 구현하고 메인 페이지 및 데이터베이스를 설계, <br>FAQ 페이지를 React 기반으로 전환, 정비소 예약 및 예약 조회, 수정, 취소 구현 | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/jh0317) |
| 김지호 | 회원가입 페이지를 React 기반으로 전환하고 관리자 전환 기능을 구현, <br>업체 예약 승인·거절 관리와 처리 결과에 따른 사용자 예약 조회 기능 개발  | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/jiho6670) |
| 채교준 | 가이드 페이지와 지도 기반 정비소 검색 페이지를 제작, SQL 설계, <br>AI 챗봇 개발, 정비소 추천 지도 연동 및 관련 기능 구현    | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/lumineon213) |
| 구현서 | 로그인 및 아이디·비밀번호 찾기 페이지 제작, 이메일 전송 기반 계정 복구와 로그인 기능, <br>검색 자동완성, 리뷰 및 별점 기능을 구현                    | [![GitHub](https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white)](https://github.com/guhyeonseo) |

## 기술 스택 🛠️

| 카테고리 | 기술 |
|--------|------|
| 운영체제 | ![Windows 11](https://img.shields.io/badge/Windows%2011-0078D6?style=flat&logo=windows11&logoColor=white) |
| 언어 | ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white) |
| 프론트엔드 | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)&nbsp;![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) |
| 백엔드 | ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=springboot&logoColor=white) |
| 데이터베이스 | ![Oracle](https://img.shields.io/badge/Oracle-F80000?style=flat&logo=oracle&logoColor=white) |
| ORM / 데이터 접근 | ![MyBatis](https://img.shields.io/badge/MyBatis-000000?style=flat&logo=mybatis&logoColor=white) |
| API / 통신 | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat)&nbsp;![Fetch](https://img.shields.io/badge/Fetch-000000?style=flat)&nbsp;![Kakao API](https://img.shields.io/badge/Kakao%20API-FFCD00?style=flat&logo=kakaotalk&logoColor=black)&nbsp;![공공데이터 API](https://img.shields.io/badge/Public%20Data%20API-003A8F?style=flat) |
| 인증 / 보안 | ![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=flat&logo=springsecurity&logoColor=white) |
| 협업 / 형상관리 | ![Jira](https://img.shields.io/badge/Jira-0052CC?style=flat&logo=jira&logoColor=white)&nbsp;![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) |
| 개발 도구 / IDE | ![STS](https://img.shields.io/badge/STS-6DB33F?style=flat&logo=spring&logoColor=white)&nbsp;![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=flat&logo=intellijidea&logoColor=white)&nbsp;![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white) |

## 🔄 서비스 이용 흐름  

1️⃣ 사용자는 로그인 페이지에서 회원가입 또는 소셜 로그인을 통해 서비스에 가입하며, 이메일 전송 기반 아이디·비밀번호 찾기 기능을 이용할 수 있습니다.  
2️⃣ 회원가입 완료 후 일반 사용자 또는 관리자(업체)로 전환할 수 있으며, 마이페이지에서 기본 정보와 반려동물 정보를 관리합니다.  
3️⃣ 메인 페이지와 FAQ, 가이드 페이지를 통해 서비스 이용 방법을 확인합니다.  
4️⃣ 사용자는 등록된 업체 정보를 조회하고 예약을 신청합니다.  
5️⃣ 업체 관리자는 관리자 페이지에서 예약을 승인 또는 거절하며, 사용자는 예약 상태를 조회·수정·취소할 수 있습니다.  
6️⃣ 이용 완료 후 리뷰 및 별점 등록이 가능하며, 정비 이력과 소모품 관리 내역을 확인합니다.  
7️⃣ 공지사항 확인 및 1대1 문의를 통해 관리자와 소통합니다.  
8️⃣ Gemini AI 챗봇을 통해 반려동물 관련 상담 및 정보를 제공합니다.  
9️⃣ 관리자는 관리자 페이지에서 회원, 예약, 공지사항, 문의 등 전반적인 서비스를 통합 관리합니다.

## 🖼 주요 화면

<details>
<summary>🏠 메인 페이지</summary>

<img width="2879" height="1463" alt="image" src="https://github.com/user-attachments/assets/4692ce49-2d4f-4f9a-853e-065f888a24d5" />
  
차량 관리 서비스를 한눈에 확인할 수 있는 메인 화면으로,  
주요 기능 안내, 빠른 예약 버튼, 공지사항 및 커뮤니티 바로가기를 제공합니다.

</details>

<details>
<summary>🔐 로그인 및 회원가입</summary>

<img width="2879" height="1430" alt="image" src="https://github.com/user-attachments/assets/ca55d971-546d-4abe-be48-97a207286410" />

로그인과 회원가입을 일반회과 업체를 구분지어놓음

</details>

<details>
<summary>🗺 지도 기반 정비소 검색</summary>

<img width="2879" height="1466" alt="image" src="https://github.com/user-attachments/assets/a1ca6ae3-c809-4595-8435-7127e15b304c" />
  
지도 API를 활용해 주변 정비소를 검색하고,  
정비소 이름·위치·상세 정보를 확인할 수 있습니다.

</details>

<details>
<summary>📅 정비소 예약</summary>

<img width="2878" height="1458" alt="image" src="https://github.com/user-attachments/assets/d032eae4-2c41-4c4c-b5a2-639cf8c1f979" />
<img width="2879" height="1463" alt="image" src="https://github.com/user-attachments/assets/01af7320-bb77-455a-9ec0-b68a26e9bcce" />

정비소 선택 후 예약을 신청할 수 있으며,  
예약 내역 조회·수정·취소 기능을 제공합니다.

</details>

<details>
<summary>✅ 업체 예약 관리</summary>

<img width="2879" height="1386" alt="image" src="https://github.com/user-attachments/assets/e9aaf367-f49d-4bd9-bd08-7c33c9b14f2b" />
  
업체(관리자)는 예약 요청을 승인 또는 거절할 수 있으며,  
처리 결과는 사용자에게 실시간으로 반영됩니다.

</details>

<details>
<summary>🧾 정비 이력 및 소모품 관리</summary>

<img width="2879" height="1398" alt="image" src="https://github.com/user-attachments/assets/a43e6f5b-fee5-4e9d-9288-73bb832f9a79" />
<img width="2879" height="1455" alt="image" src="https://github.com/user-attachments/assets/56df8c8e-ae97-4064-8d72-f70f4e4ddf5e" />


차량별 정비 이력과 소모품 교체 내역을 관리하고,  
차량 상태를 체계적으로 확인할 수 있습니다.

</details>

</details>

<details>
<summary>📢 공지사항 · 1대1 문의, FAQ </summary>
  
<img width="2879" height="1453" alt="image" src="https://github.com/user-attachments/assets/24ac0a80-1c03-434f-8d9c-2890e1b95bda" />
<img width="2879" height="1460" alt="image" src="https://github.com/user-attachments/assets/e9778414-46d6-4943-bded-e8b908c76c20" />
<img width="2879" height="1465" alt="image" src="https://github.com/user-attachments/assets/a9647538-097d-4f26-af37-0588b801d535" />


공지사항을 통해 서비스 안내를 확인하고,  
1대1 문의를 통해 관리자와 직접 소통할 수 있습니다.
또한 FAQ게시판을 통해 자주묻는 질문들을 확인할 수 있습니다.

</details>

<details>
<summary>👤 마이페이지</summary>
  
<img width="2879" height="1462" alt="image" src="https://github.com/user-attachments/assets/3fcf7a2a-8dc4-4123-9757-416b17e27eda" />
<img width="2879" height="1456" alt="image" src="https://github.com/user-attachments/assets/a5736bdf-7a24-418f-baa6-48f8d0eef527" />
<img width="2878" height="922" alt="image" src="https://github.com/user-attachments/assets/07b20fd4-6046-4ffc-ac23-3bd6223353ad" />

회원 정보 관리, 차량 정보 등록,  
예약 내역 및 정비 이력을 한 곳에서 관리할 수 있습니다.

</details>

<details>
<summary>🛠 관리자 페이지</summary>

<img src="이미지_URL" alt="관리자 페이지" />  

<img width="2877" height="1292" alt="image" src="https://github.com/user-attachments/assets/0264d61a-8fcc-47da-baba-506c06bcca9b" />
<img width="2879" height="1114" alt="image" src="https://github.com/user-attachments/assets/8c5f23e3-ccc9-4a79-a0ae-5231f0619a40" />

회원 관리, 문의 관리, 업체가입 승인 등  
서비스 운영을 위한 관리자 전용 기능을 제공합니다.

</details>

## 🐞 이슈 발생 및 해결

### 📌 이슈 개요
- **발생 상황**: React 전환 과정에서 공통 레이아웃 스타일을 적용하던 중 CSS 충돌 발생
- **증상**: 일부 페이지 진입 시 전체 레이아웃이 깨지고, 의도하지 않은 스타일이 모든 화면에 적용되는 문제 발생

### 🔍 원인 분석
- `className`을 사용하지 않고 `<main>`과 같은 **전역 태그 선택자**로 CSS를 적용함  
- 그 결과, 페이지별로 분리되어야 할 스타일이 모든 `<main>` 태그에 공통 적용되어 UI 충돌 발생

### 🛠 해결 방법
- 페이지별 최상위 요소에 **고유한 `className`을 부여**
- CSS 적용 범위를 해당 클래스 내부로 제한하여 **스타일 스코프 분리**
- 공통 레이아웃 스타일과 페이지별 스타일을 명확히 분리하여 관리

### ✅ 개선 결과
- 전역 CSS 충돌 문제 완전 해결
- 페이지별 UI 독립성 확보로 유지보수성 향상
- React 컴포넌트 단위 스타일 관리의 중요성에 대한 이해도 강화


- 6인 팀 프로젝트로 **기획 → 설계 → 개발 → 협업 → 배포 흐름 전반을 경험**
- Vite + React와 Spring Boot를 활용한 **프론트·백엔드 분리 아키텍처 구현**
- Spring Security와 BCrypt를 적용해 **비밀번호 암호화 및 보안 강화**
- Oracle DB 기반 **차량·예약·회원 데이터 구조 설계 및 CRUD 구현**
- Kakao API 및 공공데이터 API 연동으로 **지도 기반 정비소 검색 기능 구현**
- AI 챗봇 기능을 통해 **외부 AI API 연동 경험 확보**
- GitHub Flow 기반 브랜치 전략과 Jira를 활용한 **협업 및 이슈 관리 경험**
- CSS 충돌, 권한 분기, 예약 상태 관리 등 **실제 서비스 수준의 트러블슈팅 경험 축적**

## 🚀 개선 과제 및 향후 계획

- 관리자·업체·사용자 권한을 명확히 분리한 **Role 기반 접근 제어 고도화**
- 예약 승인/거절 상태 흐름을 단순화하고 알림 기능을 추가하여 **예약 UX 개선**
- 대용량 데이터 증가에 대비한 **쿼리 튜닝 및 인덱스 최적화**
- 공공데이터 API 장애 발생 시를 대비한 **Fallback 처리 및 예외 대응 로직 강화**
- 테스트 코드(JUnit, Mockito) 도입을 통한 **기능 안정성 및 회귀 오류 방지**
- CI/CD 파이프라인 구축을 통해 **배포 자동화 및 운영 효율성 향상**
