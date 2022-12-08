import BlueBGWrapper from 'src/components/Wrappers/BlueBGWrapper';
import SignIn from 'src/views/account/SignIn';
import { Container } from 'reactstrap';
import withPublicPage from 'src/libs/hoc/withPublicPage';

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

export default withPublicPage(SignInPage);
