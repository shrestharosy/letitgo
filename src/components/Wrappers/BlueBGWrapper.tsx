interface IBlueBGWrapperProps {
    children: JSX.Element;
}

const BlueBGWrapper = (props: IBlueBGWrapperProps) => {
    return (
        <section className='section section-shaped section-lg'>
            <div className='shape shape-style-1 bg-gradient-default'>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
            </div>
            {props.children}
        </section>
    );
};

export default BlueBGWrapper;
