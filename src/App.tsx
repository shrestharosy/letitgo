import SimpleFooter from './components/Footers/SimpleFooter';
import Navbar from './components/Navbar';
import Routes from './routes';

function App() {
    return (
        <>
            <Navbar />
            <section className='section section-lg section-shaped'>
                <Routes />
            </section>
            <SimpleFooter />
        </>
    );
}

export default App;
