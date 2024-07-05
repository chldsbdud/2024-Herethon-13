let rating = 0;

    function goBack() {
      window.location.href = "detail.html";
    }

    function setRating(star) {
      rating = star;
      for (let i = 1; i <= 5; i++) {
        const starElement = document.getElementById(`star${i}`);
        if (i <= star) {
          starElement.src = "img/fullstar.svg";
        } else {
          starElement.src = "img/emptystar.svg";
        }
      }
    }

    // 리뷰 제출 함수
    async function submitReview() {
      const apiUrl = 'http://127.0.0.1:8000/goodplace/review/'; // 백엔드 API URL

      // 입력된 리뷰 가져오기
      const reviewText = document.getElementById('inputcontent').value;

      // 여기에 access_token을 가져오는 로직 추가
      const access_token = localStorage.getItem('access_token'); // 예시: 로컬 스토리지에서 access_token을 가져오는 경우

      try {
        // 리뷰 데이터를 서버에 전송
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`, // Authorization 헤더에 access_token 추가
          },
          body: JSON.stringify({
            text: reviewText,
            rating: rating, // 별점 추가
          }),
        });

        // 응답 처리
        if (response.ok) {
          alert('리뷰가 성공적으로 제출되었습니다.');

          // detail.html 페이지로 이동하고, URL에 리뷰 내용을 파라미터로 전달하여 표시
          const reviewData = await response.json(); // 서버에서 리뷰 데이터를 반환하는 경우
          const reviewId = reviewData.id;
          window.location.href = `detail.html?reviewId=${reviewId}`;

        } else {
          alert('리뷰 제출에 실패했습니다.');
          console.error('Failed to submit review');
        }
      } catch (error) {
        console.error('리뷰 제출 중 에러 발생:', error);
        alert('리뷰 제출 중 에러가 발생했습니다.');
      }
    }