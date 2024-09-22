import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Form, ListGroup, Modal, Dropdown, DropdownButton } from 'react-bootstrap';
import { addBucket, addMedia, deleteMedia, moveMedia ,addToHistory} from '../redux/actions/mediaActions';

const Dashboard = () => {
  const [newBucketName, setNewBucketName] = useState('');
  const [selectedBucketId, setSelectedBucketId] = useState('');
  const [newCardName, setNewCardName] = useState('');
  const [newCardLink, setNewCardLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');

  const dispatch = useDispatch(); 
  const buckets = useSelector(state => state.media.buckets);

  const handleAddBucket = (e) => {    
    e.preventDefault();
    if (newBucketName.trim()) {
      dispatch(addBucket(newBucketName));
      setNewBucketName('');
    }
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (selectedBucketId && newCardName.trim() && newCardLink.trim()) {
      dispatch(addMedia(selectedBucketId, newCardName, newCardLink));
      setNewCardName('');
      setNewCardLink('');
    }
  };

  const handleDeleteCard = (bucketId, cardId, e) => {
    e.stopPropagation();
    dispatch(deleteMedia(bucketId, cardId));
  };

  const handleMoveCard = (fromBucketId, toBucketId, cardId, e) => {
    e.stopPropagation();
    dispatch(moveMedia(fromBucketId, toBucketId, cardId));
  };

 
  const handleCardClick = (link, card, e) => {
    e.stopPropagation();
    console.log('Dispatching to history:', card); 
    console.log('About to dispatch to history with:', { ...card, timestamp: Date.now() });
   
    dispatch(addToHistory(card));
    setMediaUrl(link);
    setShowModal(true);
  };
  
  

  const handleCloseModal = () => {
    setShowModal(false);
  };




  const testAddHistory = () => {
    const testMedia = { name: 'Test Media', link: 'http://example.com' };
    console.log('Adding test media to history:', testMedia);
    dispatch(addToHistory(testMedia));
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <Row>
        <Col md={6}>
          <h2>Add Bucket</h2>
          <Form onSubmit={handleAddBucket}>
            <Form.Group>
              <Form.Control 
                type="text" 
                placeholder="Enter bucket name" 
                value={newBucketName}
                onChange={(e) => setNewBucketName(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Add Bucket</Button>
          </Form>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col>
          <h2>Buckets</h2>
          <ListGroup>
            {buckets.map(bucket => (
              <ListGroup.Item key={bucket.id}>
                <h3>{bucket.name}</h3>
                <Form onSubmit={handleAddCard}>
                  <Form.Group>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter card name" 
                      value={newCardName}
                      onChange={(e) => setNewCardName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter card link" 
                      value={newCardLink}
                      onChange={(e) => setNewCardLink(e.target.value)}
                    />
                  </Form.Group>
                  <Button type="submit" onClick={() => setSelectedBucketId(bucket.id)}>
                    Add Card to {bucket.name}
                  </Button>
                </Form>
                <ListGroup className="mt-2">
                  {bucket.media.map(card => (
                    <ListGroup.Item key={card.id}>
                      <div onClick={(e) => handleCardClick(card.link, e)} style={{ cursor: 'pointer' }}>
                        <strong>{card.name}</strong>: {card.link}
                      </div>
                      <Button variant="danger" size="sm" onClick={(e) => handleDeleteCard(bucket.id, card.id, e)}>
                        Delete
                      </Button>
                      <DropdownButton id="dropdown-basic-button" title="Move To" size="sm">
                        {buckets.filter(b => b.id !== bucket.id).map(otherBucket => (
                          <Dropdown.Item key={otherBucket.id} onClick={(e) => handleMoveCard(bucket.id, otherBucket.id, card.id, e)}>
                            {otherBucket.name}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Button onClick={testAddHistory}>Add Test History</Button> 
      {/* Modal Component for Playing Media */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Media Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe 
            src={mediaUrl} 
            width="100%" 
            height="400px" 
            allow="autoplay; fullscreen" 
            frameBorder="0"
          ></iframe>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
