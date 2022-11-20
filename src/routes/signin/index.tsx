import BlueBGWrapper from 'src/components/Wrappers/BlueBGWrapper';
import SignIn from 'src/views/account/SignIn';
import { Container } from 'reactstrap';

const SignInPage = () => {
    return (
        <>
            <BlueBGWrapper>
                <Container className='pt-lg-7'>
                    <SignIn />
                </Container>
            </BlueBGWrapper>
        </>
    );
};

export default SignInPage;
