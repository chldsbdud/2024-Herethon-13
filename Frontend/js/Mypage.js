document.addEventListener('DOMContentLoaded', () => {
  const navigateToMap = () => {
      window.location.href = '/Frontend/pages/Community.html';
  };

  // Kakao.init('YOUR_APP_KEY');
  const handleLogout = () => {
      window.location.href = '/Frontend/pages/Login.html';
      // Kakao.Auth.logout(() => {
      //       alert('로그아웃 되었습니다.');
      //       window.location.href = '/Frontend/pages/Login.html';
      //   });
  };

  // 전역에서 함수 접근 가능하도록 설정
  window.navigateToMap = navigateToMap;
  window.handleLogout = handleLogout;
});
