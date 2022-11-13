import React from 'react';

import SimpleFooter from 'src/components/Footers/SimpleFooter';
import Navbar from 'src/components/Navbar';
import Section from './section';

class Landing extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <main ref='main'>
                    <Section />
                </main>
                <SimpleFooter />
            </>
        );
    }
}

export default Landing;
