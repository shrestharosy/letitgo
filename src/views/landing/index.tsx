import React from 'react';

import { Col, Container, Row } from 'reactstrap';

import SimpleFooter from 'src/components/Footers/SimpleFooter';
import Navbar from 'src/components/Navbar';

class Landing extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <main ref='main'>
                    <div className='position-relative'></div>

                    <section className='section section-lg'>
                        <Container>
                            <Row className='row-grid align-items-center'>
                                <Col className='order-md-1' md='6'>
                                    <div className='pr-md-5'></div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>
                <SimpleFooter />
            </>
        );
    }
}

export default Landing;
