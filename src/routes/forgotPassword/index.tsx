import BlueBGWrapper from 'src/components/Wrappers/BlueBGWrapper';
import { Container } from 'reactstrap';
import withPublicPage from 'src/libs/hoc/withPublicPage';
import ForgotPassword from 'src/views/account/ForgotPassword';

const ForgotPasswordPage = () => {
    return (
        <>
            <BlueBGWrapper>
                <Container className='pt-lg-7'>
                    <ForgotPassword />
                </Container>
            </BlueBGWrapper>
        </>
    );
};

export default withPublicPage(ForgotPasswordPage);
