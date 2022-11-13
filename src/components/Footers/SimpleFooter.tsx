import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class SimpleFooter extends React.Component {
    render() {
        return (
            <>
                <footer className=' footer'>
                    <Container>
                        <Row className=' align-items-center justify-content-md-between'>
                            <Col md='6'>
                                <div className=' copyright'>
                                    © {new Date().getFullYear()}{' '}
                                    <span>Let It Go</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </>
        );
    }
}

export default SimpleFooter;
