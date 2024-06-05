import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const CommentPart=({comment,index})=>{                  //댓글하나단위의 컴포넌트

    return(
        <div key={index} className="comment-item" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <p><strong>{comment.userName}</strong> <span style={{ color: 'gray', fontSize: '12px' }}>{new Date(comment.cmtRegDate).toLocaleString('ko-KR')}</span></p>
        <p>{comment.cmtContent}</p>
      </div>
    )
}

const CommentSection = ({ productId }) => {                       //댓글 전체 컴포넌트
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {                            //댓글 패치 함수
    try {
      const response = await axios.get(`http://3.34.122.83:8080/product/${productId}`);
      setComments(response.data.comment);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }
      const headers = { 'Authorization': `Bearer ${token}` };
      await axios.post(
        `http://3.34.122.83:8080/product/${productId}/comment`,
        { cmtContent: newComment },
        { headers }
      );
      setNewComment('');
      fetchComments(); // 코멘트 추가후 패치
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert("로그인 후 이용해주세요")
    }
  };

   
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comment-section" style={{ marginTop: '20px' }}>
      <h3>딩동톡</h3>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <CommentPart comment={comment} index={index}/>
        ))}
      </div>
      <div className="add-comment" style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          style={{ width: '80%', padding: '10px', marginRight: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
        <button onClick={handleAddComment} style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#28a745', color: 'white' }}>댓글 작성</button>
      </div>
    </div>
  );
};

export default CommentSection;