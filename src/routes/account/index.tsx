import withProtectedPage from 'src/libs/hoc/withProtectedPage';

const AccountPage = () => {
    return (
        <>
            <h1>My account</h1>
        </>
    );
};

export default withProtectedPage(AccountPage);
