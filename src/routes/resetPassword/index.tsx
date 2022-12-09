import { Container } from 'reactstrap';
import BlueBGWrapper from 'src/components/Wrappers/BlueBGWrapper';
import withPublicPage from 'src/libs/hoc/withPublicPage';
import ResetPassword from 'src/views/account/ResetPassword';

const ResetPasswordPage = () => {
    return (
        <>
            <BlueBGWrapper>
                <Container className='pt-lg-7'>
                    <ResetPassword />
                </Container>
            </BlueBGWrapper>
        </>
    );
};

export default withPublicPage(ResetPasswordPage);
