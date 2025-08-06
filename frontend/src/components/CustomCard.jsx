import { Card } from 'react-bootstrap';

function CustomCard({ title, children, className = '' }) {
  return (
    <Card className={`shadow ${className}`}>
      <Card.Header className="bg-dark text-white text-center">{title}</Card.Header>
      <Card.Body className="p-1">
        {children}
      </Card.Body>
    </Card>
  );
}

export default CustomCard;