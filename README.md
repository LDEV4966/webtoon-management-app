## Create webtoon-management-app with React hooks

### 필요한 언어 

html,css,javascript,react hooks

### 목적 

구독중인 다양한 사이트의 웹툰을 체계적으로,용이하게 관리

### 기능 
0. Login 기능 ( Google id or 서버 내 account로 접속가능)  
1. 구독중인 웹툰의 업데이트 상태를 realtime으로 알려주기.
2. 마이프로필 : 원하는 웹툰 사이트의 웹툰 정보를 요일별로 보여 주며, 원하지 않는 웹툰은 삭제 가능.
3. 웹툰 사이트 : 해당 사이트에서 제공하는 웹툰들의 정보를 보여주며, 마이프로필에 즐겨 찾기 되어있는 웹툰과 그렇지 않은 웹툰을 실시간으로 비교해서 보여준다

### 기술

1. webscrapping
- Library : how to use the Axios and Cheerio packages
2. authentication 
- based on Firebase auth
3. realtime-database
- based on Firebase firestore

### npm module

*  npm install react-router-dom
*  npm install --save firebase
*  npm install axios
*  npm install cheerio
*  npm install http-proxy-middleware --save

### 한계

#### 1.  출처 리소스 공유( Cross-Origin Resource Sharing, CORS )

 - Local 개발환경에  git pages나 별도의 서버에서 발생하는 CORS 문제 해결 실패
 - Local 개발환경에서는 'http-proxy-middleware'를 이용한 proxy 서버를 이용하여 해결하였으나, 별도의 서버에서는 여전히 해결 못하는 듯 보임.
 - CORS가 발생하는 이유는 보안상의 이유로 다른 사용자가 id, secret을 도용하여 api를 무단으로 호출하는 것을 막기 위해서이다. 
 - 위를 해결하기 위해서는 서버 프로그래밍을 통해서만 데이터를 호출하도록 되어 있는데 아직 서버관련 지식이 부족해 추후에 보완예정임.
 - 관련,  <a href="https://msyu1207.tistory.com/entry/React%EB%A1%9C-%EC%98%81%ED%99%94-%EA%B2%80%EC%83%89-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90-%EC%84%B8%EB%B2%88%EC%A7%B8-%EB%84%A4%EC%9D%B4%EB%B2%84-API-%EC%82%AC%EC%9A%A9-React-%EB%B0%B0%ED%8F%AC-CORS-%EC%84%A4%EC%A0%95-%ED%95%98%EA%B8%B0?category=906762">출처 사이트</a>


#### 2.  타 웹툰사이트의 저작권

 - 카카오페이지,레진 코믹스, 탑툰 등 네이버를 제외한 타 사이트의 web-scroll 이 restricted 되어 있어 scroll이 불가능 했음.
 
