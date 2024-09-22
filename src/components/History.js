import React from 'react';
import { useSelector } from 'react-redux';
import { Container, ListGroup, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';    
const History = () => {
  const history = useSelector((state) => state.media.mediaHistory || []);
  console.log('Current History:', history); 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <h2>History</h2>
      {history.length === 0 ? (
        <Alert variant="info">No history available.</Alert>
      ) : (
        <ListGroup>
          {history.map((item, index) => (
            <ListGroup.Item key={index} >
              <h5>{item.name}</h5>
              <p>Link: {item.link}</p>
              <p>Played at: {new Date(item.timestamp).toLocaleString()}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      
    </Container>
  );
};

export default History;
