import SignUp from 'src/views/account/SignUp';
import BlueBGWrapper from 'src/components/Wrappers/BlueBGWrapper';
import { Container } from 'reactstrap';

const SignUpPage = () => {
    return (
        <>
            <BlueBGWrapper>
                <Container className='pt-lg-7'>
                    <SignUp />
                </Container>
            </BlueBGWrapper>
        </>
    );
};

export default SignUpPage;
