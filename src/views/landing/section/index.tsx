import { Col, Row } from 'reactstrap';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const imageUrl = [
    'https://loremflickr.com/320/240',
    'https://picsum.photos/200/300',
    'https://source.unsplash.com/user/c_v_r',
    `https://source.unsplash.com/random/300x200?sig=${Math.random()}`,
    `require('src/assets/img/theme/team-1-800x800.jpg')`,
];

const Section = () => {
    return (
        <section className='section section-lg'>
            <div className='pl-6 pr-6'>
                <Row className='justify-content-center'>
                    {array.map(() => (
                        <Col lg={3} md={3} sm={4} className={'mt-5'}>
                            <div style={{ height: '350px', width: '350px' }}>
                                <img
                                    alt='...'
                                    className='img-fluid rounded shadow'
                                    src={
                                        imageUrl[
                                            Math.floor(Math.random() * (3 + 1))
                                        ]
                                    }
                                />
                            </div>
                            <small className=''>
                                ASOS design knitted oversized fisherman rib
                                jumper in oatmeal twist
                            </small>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};

export default Section;
