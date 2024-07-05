function goBack() {
  window.location.href = "goodplace.html";
}

function goReview() {
  window.location.href = "review.html";
}

const urlParams = new URLSearchParams(window.location.search);
    const reviewId = urlParams.get('reviewId');

    // 리뷰 ID를 사용하여 서버에서 리뷰 데이터를 가져와서 화면에 표시하는 함수
    async function fetchReviewById(reviewId) {
      const apiUrl = `http://127.0.0.1:8000/goodplace/review/${reviewId}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('리뷰를 가져오는 데 실패했습니다.');
        }
        const review = await response.json();

        // 리뷰를 화면에 추가하기
        const reviewContainer = document.getElementById('reviewContainer');

        const reviewBox = document.createElement('div');
        reviewBox.className = 'reviewbox';

        const topSection = document.createElement('div');
        topSection.className = 'top-section';
        const h2 = document.createElement('h2');
        h2.className = 'large-text';
        h2.textContent = review.username; // 예시: 리뷰의 유저네임 필드
        topSection.appendChild(h2);

        const middleSection = document.createElement('div');
        middleSection.className = 'middle-section';
        const h5 = document.createElement('h5');
        h5.className = 'small-text';
        h5.textContent = review.text; // 예시: 리뷰의 텍스트 필드
        middleSection.appendChild(h5);

        reviewBox.appendChild(topSection);
        reviewBox.appendChild(middleSection);

        reviewContainer.appendChild(reviewBox);

      } catch (error) {
        console.error('리뷰를 가져오는 중 에러 발생:', error);
      }
    }

    // 페이지 로드 시 URL 파라미터에 따라 해당 리뷰를 가져와서 화면에 표시
    document.addEventListener('DOMContentLoaded', function() {
      if (reviewId) {
        fetchReviewById(reviewId);
      }
    });